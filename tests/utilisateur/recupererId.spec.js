const recupererId = require('../../controllers/Utilisateur/recupererId');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    utilisateur: {
      findUnique: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('recupererId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the user ID if the user is found', async () => {
    const mockUtilisateur = { idUtilisateur: 1 };
    prisma.utilisateur.findUnique.mockResolvedValue(mockUtilisateur);

    const req = {
      query: {
        pseudo: 'testuser',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await recupererId(req, res);

    expect(prisma.utilisateur.findUnique).toHaveBeenCalledWith({
      where: { pseudo: 'testuser' },
      select: { idUtilisateur: true },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ idUtilisateur: 1 });
  });

  it('should return a 404 error if the user is not found', async () => {
    prisma.utilisateur.findUnique.mockResolvedValue(null);

    const req = {
      query: {
        pseudo: 'unknownuser',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await recupererId(req, res);

    expect(prisma.utilisateur.findUnique).toHaveBeenCalledWith({
      where: { pseudo: 'unknownuser' },
      select: { idUtilisateur: true },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Utilisateur non trouvé" });
  });

  it('should return a 500 error if an exception is thrown', async () => {
    prisma.utilisateur.findUnique.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        pseudo: 'testuser',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await recupererId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de la récupération de l'ID utilisateur" });
  });
});
