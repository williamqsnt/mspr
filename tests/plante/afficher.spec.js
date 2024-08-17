const afficher = require('../../controllers/Plante/afficher');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    plante: {
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

  it('should retrieve a plant by id and return a 200 status', async () => {
    const mockPlantes = [
      { idPlante: 1, nom: 'Plante Test', description: 'Description de la plante' },
    ];

    prisma.plante.findMany.mockResolvedValue(mockPlantes);

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

    expect(prisma.plante.findMany).toHaveBeenCalledWith({
      where: {
        idPlante: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ plantes: mockPlantes });
  });

  it('should return a 500 status if there is an error', async () => {
    prisma.plante.findMany.mockRejectedValue(new Error('Database error'));

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
    expect(res.json).toHaveBeenCalledWith({
      error: "Erreur lors de l'affichage des plantes par id",
    });
  });
});
