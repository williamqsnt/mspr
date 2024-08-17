const recupererInfos = require('../../controllers/Plante/recupererInfos');
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

describe('recupererInfos', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return plants without guardians', async () => {
    const mockPlantes = [
      { adresse: '123 Rue des Fleurs', idPlante: 1, espece: 'Rose', nom: 'Rose' },
      { adresse: '456 Avenue des Arbres', idPlante: 2, espece: 'Chêne', nom: 'Chêne' },
    ];

    prisma.plante.findMany.mockResolvedValue(mockPlantes);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await recupererInfos(req, res);

    expect(prisma.plante.findMany).toHaveBeenCalledWith({
      where: {
        gardiennages: {
          some: {
            idUtilisateur: null,
          },
        },
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ plantes: mockPlantes });
  });

  it('should return a 500 status if there is an error', async () => {
    prisma.plante.findMany.mockRejectedValue(new Error('Database error'));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await recupererInfos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erreur lors de l\'affichage des adresses',
    });
  });
});
