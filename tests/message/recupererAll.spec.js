const recupererAll = require('../../controllers/Message/recupererAll');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    message: {
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('recupererAll', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve all messages and return a 200 status', async () => {
    const mockMessages = [
      { id: 1, contenu: 'Message 1', idUtilisateur: 1, idConversation: 1, dateEnvoi: '2024-08-17T10:00:00.000Z' },
      { id: 2, contenu: 'Message 2', idUtilisateur: 2, idConversation: 1, dateEnvoi: '2024-08-17T10:05:00.000Z' },
    ];

    prisma.message.findMany.mockResolvedValue(mockMessages);

    const req = {
      query: {
        idConversation: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await recupererAll(req, res);

    expect(prisma.message.findMany).toHaveBeenCalledWith({
      where: {
        idConversation: 1,
      },
      orderBy: {
        dateEnvoi: 'asc',
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ messages: mockMessages });
  });

  it('should return a 500 status if there is an error', async () => {
    prisma.message.findMany.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        idConversation: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await recupererAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erreur lors de l'affichage des messages",
    });
  });
});
