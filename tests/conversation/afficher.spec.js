const afficher = require('../../controllers/Conversation/afficher');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    conversation: {
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('afficher', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return conversations for the user if found', async () => {
    const mockConversations = [
      { idConversation: 1, idUtilisateur: 1, idUtilisateur_1: 2 },
      { idConversation: 2, idUtilisateur: 1, idUtilisateur_1: 3 },
    ];
    prisma.conversation.findMany.mockResolvedValue(mockConversations);

    const req = {
      query: {
        idUtilisateur: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await afficher(req, res);

    expect(prisma.conversation.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          { idUtilisateur: 1 },
          { idUtilisateur_1: 1 },
        ],
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Conversations récupérées",
      conversations: mockConversations,
    });
  });

  it('should return a 500 error if an exception is thrown', async () => {
    prisma.conversation.findMany.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        idUtilisateur: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await afficher(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de la récupération des conversations" });
  });
});
