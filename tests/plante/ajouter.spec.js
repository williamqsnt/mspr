const ajouter = require('../../controllers/Plante/ajouter');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    plante: {
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

  it('should create a new plant with photoUrl and return a 200 status', async () => {
    const mockPlante = {
      idPlante: 1,
      espece: 'Ficus',
      description: 'Plante d\'intérieur',
      nom: 'Ficus Lyrata',
      adresse: '123 Rue des Plantes',
      idUtilisateur: 1,
      photoUrl: 'http://example.com/photo.jpg',
    };

    prisma.plante.create.mockResolvedValue(mockPlante);

    const req = {
      query: {
        espece: 'Ficus',
        description: 'Plante d\'intérieur',
        nom: 'Ficus Lyrata',
        adresse: '123 Rue des Plantes',
        idUtilisateur: '1',
        photoUrl: 'http://example.com/photo.jpg',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouter(req, res);

    expect(prisma.plante.create).toHaveBeenCalledWith({
      data: {
        espece: 'Ficus',
        description: 'Plante d\'intérieur',
        nom: 'Ficus Lyrata',
        adresse: '123 Rue des Plantes',
        idUtilisateur: 1,
        photoUrl: 'http://example.com/photo.jpg',
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Plante créée', plante: mockPlante });
  });

  it('should return a 500 status if there is an error', async () => {
    prisma.plante.create.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        espece: 'Ficus',
        description: 'Plante d\'intérieur',
        nom: 'Ficus Lyrata',
        adresse: '123 Rue des Plantes',
        idUtilisateur: '1',
        photoUrl: 'http://example.com/photo.jpg',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouter(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erreur lors de la création de la plante',
    });
  });
});
