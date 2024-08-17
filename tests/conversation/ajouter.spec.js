const ajouter = require('../../controllers/Conversation/ajouter');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    conversation: {
      create: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('ajouter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new conversation and return success message', async () => {
    const mockConversation = {
      idConversation: 1,
      idUtilisateur: 1,
      idUtilisateur_1: 2,
      idGardiennage: 3,
    };
    prisma.conversation.create.mockResolvedValue(mockConversation);

    const req = {
      query: {
        idUtilisateur: '1',
        idUtilisateur_1: '2',
        idGardiennage: '3',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouter(req, res);

    expect(prisma.conversation.create).toHaveBeenCalledWith({
      data: {
        idUtilisateur: 1,
        idUtilisateur_1: 2,
        idGardiennage: 3,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Conversation créée",
      conversation: mockConversation,
    });
  });

  it('should return a 500 error if an exception is thrown', async () => {
    prisma.conversation.create.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        idUtilisateur: '1',
        idUtilisateur_1: '2',
        idGardiennage: '3',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouter(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de la création de la conversation" });
  });
});
