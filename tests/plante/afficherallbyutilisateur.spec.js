const afficherAllByUtilisateur = require('../../controllers/Plante/afficherAllByUtilisateur');
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

describe('afficherAllByUtilisateur', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve all plants by user id and return a 200 status', async () => {
    const mockPlantes = [
      { idPlante: 1, nom: 'Plante Utilisateur 1', description: 'Description de la plante 1', idUtilisateur: 1 },
      { idPlante: 2, nom: 'Plante Utilisateur 2', description: 'Description de la plante 2', idUtilisateur: 1 },
    ];

    prisma.plante.findMany.mockResolvedValue(mockPlantes);

    const req = {
      query: {
        idUtilisateur: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await afficherAllByUtilisateur(req, res);

    expect(prisma.plante.findMany).toHaveBeenCalledWith({
      where: {
        idUtilisateur: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ plantes: mockPlantes });
  });

  it('should return a 500 status if there is an error', async () => {
    prisma.plante.findMany.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        idUtilisateur: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await afficherAllByUtilisateur(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erreur lors de l'affichage des plantes par utilisateur",
    });
  });
});
