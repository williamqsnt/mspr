const afficher = require('../../controllers/Conseil/afficher');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    conseil: {
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

  it('should return conseils for a plant if found', async () => {
    const mockConseils = [
      { idConseil: 1, contenu: 'Arroser régulièrement', utilisateur: { pseudo: 'user1' } },
      { idConseil: 2, contenu: 'Utiliser du terreau spécial', utilisateur: { pseudo: 'user2' } }
    ];
    prisma.conseil.findMany.mockResolvedValue(mockConseils);

    const req = {
      query: {
        idPlante: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await afficher(req, res);

    expect(prisma.conseil.findMany).toHaveBeenCalledWith({
      where: { idPlante: 1 },
      include: { utilisateur: true },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Conseils récupérés",
      conseils: mockConseils,
    });
  });

  it('should return a 500 error if an exception is thrown', async () => {
    prisma.conseil.findMany.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        idPlante: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await afficher(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de la récupération des conseils" });
  });
});
