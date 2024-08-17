const ajouter = require('../../controllers/Message/ajouter');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    message: {
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

  it('should create a new message and return a 200 status', async () => {
    const mockMessage = {
      dateEnvoi: new Date().toISOString(),
      contenu: 'Test message',
      idUtilisateur: 1,
      idConversation: 1,
    };

    prisma.message.create.mockResolvedValue(mockMessage);

    const req = {
      query: {
        contenu: 'Test message',
        idUtilisateur: '1',
        idConversation: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouter(req, res);

    expect(prisma.message.create).toHaveBeenCalledWith({
      data: {
        dateEnvoi: expect.any(String), // The actual date will be checked in the response
        contenu: 'Test message',
        idUtilisateur: 1,
        idConversation: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Message créé",
      message: mockMessage,
    });
  });

  it('should return a 500 status if there is an error', async () => {
    prisma.message.create.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        contenu: 'Test message',
        idUtilisateur: '1',
        idConversation: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouter(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erreur lors de la création du message",
    });
  });
});
