const recupererLocalisation = require('../../controllers/Plante/recupererLocalisation');
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

describe('recupererLocalisation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return addresses of plants without guardians', async () => {
    const mockAdresses = [
      { adresse: '123 Rue des Fleurs', idPlante: 1 },
      { adresse: '456 Avenue des Arbres', idPlante: 2 },
    ];

    prisma.plante.findMany.mockResolvedValue(mockAdresses);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await recupererLocalisation(req, res);

    expect(prisma.plante.findMany).toHaveBeenCalledWith({
      where: {
        gardiennages: {
          some: {
            idUtilisateur: null,
          },
        },
      },
      select: {
        adresse: true,
        idPlante: true,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ adresses: mockAdresses });
  });

  it('should return a 500 status if there is an error', async () => {
    prisma.plante.findMany.mockRejectedValue(new Error('Database error'));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await recupererLocalisation(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erreur lors de l\'affichage des adresses',
    });
  });
});
