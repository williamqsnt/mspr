const afficher = require('../../controllers/Plante/afficher');
const { PrismaClient } = require('@prisma/client');

// Mock du module PrismaClient
jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    plante: {
      findUnique: jest.fn(),  // On corrige ici pour utiliser findUnique
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
    const mockPlante = {
      idPlante: 1,
      nom: 'Plante Test',
      description: 'Description de la plante',
      gardiennages: [],
    };

    prisma.plante.findUnique.mockResolvedValue(mockPlante);  // On corrige ici pour utiliser findUnique

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

    expect(prisma.plante.findUnique).toHaveBeenCalledWith({
      where: {
        idPlante: 1,
      },
      include: {
        gardiennages: {
          where: {
            idUtilisateur: null,
          },
          select: {
            idGardiennage: true,
            dateDebut: true,
            dateFin: true,
          },
        },
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ plante: mockPlante });
  });

  it('should return a 404 status if the plant is not found', async () => {
    prisma.plante.findUnique.mockResolvedValue(null);  // Simuler qu'aucune plante n'est trouvée

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

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Plante non trouvée" });
  });

  it('should return a 500 status if there is an error', async () => {
    prisma.plante.findUnique.mockRejectedValue(new Error('Database error'));  // Simuler une erreur

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
      error: "Erreur lors de l'affichage de la plante par id",
    });
  });
});
