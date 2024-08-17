const recupererPhotoPlante = require('../../controllers/Conversation/recupererPhotoPlante');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    conversation: {
      findUnique: jest.fn(),
    },
    plante: {
      findUnique: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('recupererPhotoPlante', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the photo URL of the plant associated with the conversation', async () => {
    const mockConversation = {
      gardiennage: {
        idPlante: 1,
      },
    };
    const mockPlante = {
      photoUrl: 'http://example.com/photo.jpg',
    };

    prisma.conversation.findUnique.mockResolvedValue(mockConversation);
    prisma.plante.findUnique.mockResolvedValue(mockPlante);

    const req = {
      query: {
        idConversation: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await recupererPhotoPlante(req, res);

    expect(prisma.conversation.findUnique).toHaveBeenCalledWith({
      where: {
        idConversation: 1,
      },
      select: {
        gardiennage: {
          select: {
            idPlante: true,
          },
        },
      },
    });
    expect(prisma.plante.findUnique).toHaveBeenCalledWith({
      where: {
        idPlante: 1,
      },
      select: {
        photoUrl: true,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ photoUrl: 'http://example.com/photo.jpg' });
  });

  it('should return a 404 error if the conversation or gardiennage is not found', async () => {
    prisma.conversation.findUnique.mockResolvedValue(null);

    const req = {
      query: {
        idConversation: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await recupererPhotoPlante(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Conversation ou gardiennage non trouvé" });
  });

  it('should return a 404 error if the plant or photo URL is not found', async () => {
    const mockConversation = {
      gardiennage: {
        idPlante: 1,
      },
    };
    prisma.conversation.findUnique.mockResolvedValue(mockConversation);
    prisma.plante.findUnique.mockResolvedValue(null);

    const req = {
      query: {
        idConversation: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await recupererPhotoPlante(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Plante ou photo non trouvée" });
  });

  it('should return a 500 error if an exception is thrown', async () => {
    prisma.conversation.findUnique.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        idConversation: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await recupererPhotoPlante(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de la récupération de la photo de la plante" });
  });
});
