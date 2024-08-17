const estBotaniste = require('../../controllers/Utilisateur/estBotaniste');
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

describe('estBotaniste', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the estBotaniste status if the user is found', async () => {
    const mockUtilisateur = { estBotaniste: true };
    prisma.utilisateur.findUnique.mockResolvedValue(mockUtilisateur);

    const req = {
      query: {
        idUtilisateur: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await estBotaniste(req, res);

    expect(prisma.utilisateur.findUnique).toHaveBeenCalledWith({
      where: { idUtilisateur: 1 },
      select: { estBotaniste: true },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ estBotaniste: true });
  });

  it('should return a 404 error if the user is not found', async () => {
    prisma.utilisateur.findUnique.mockResolvedValue(null);

    const req = {
      query: {
        idUtilisateur: '2',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await estBotaniste(req, res);

    expect(prisma.utilisateur.findUnique).toHaveBeenCalledWith({
      where: { idUtilisateur: 2 },
      select: { estBotaniste: true },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Role non trouvé" });
  });

  it('should return a 500 error if an exception is thrown', async () => {
    prisma.utilisateur.findUnique.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        idUtilisateur: '3',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await estBotaniste(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de la récupération du role utilisateur" });
  });
});
