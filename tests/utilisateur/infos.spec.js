const infos = require('../../controllers/Utilisateur/infos');
const { PrismaClient } = require('@prisma/client');
const { decrypt } = require('../../utils/cryptoUtils');

jest.mock('@prisma/client');
jest.mock('../../utils/cryptoUtils');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    utilisateur: {
      findUnique: jest.fn(),
    },
    plante: {
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('infos', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user information and plants if the user is found', async () => {
    const mockUtilisateur = { nom: 'encryptedNom', prenom: 'encryptedPrenom' };
    const mockPlantes = [{ nom: 'Plante1' }, { nom: 'Plante2' }];
    
    prisma.utilisateur.findUnique.mockResolvedValue(mockUtilisateur);
    prisma.plante.findMany.mockResolvedValue(mockPlantes);
    decrypt.mockImplementation(value => `decrypted${value}`);

    const req = {
      query: {
        idUtilisateur: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await infos(req, res);

    expect(prisma.utilisateur.findUnique).toHaveBeenCalledWith({
      where: { idUtilisateur: 1 },
      select: { nom: true, prenom: true },
    });
    expect(decrypt).toHaveBeenCalledWith('encryptedNom');
    expect(decrypt).toHaveBeenCalledWith('encryptedPrenom');
    expect(prisma.plante.findMany).toHaveBeenCalledWith({
      where: { idUtilisateur: 1 },
      select: { nom: true },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Profil récupéré",
      utilisateur: { nom: 'decryptedencryptedNom', prenom: 'decryptedencryptedPrenom' },
      plantes: mockPlantes,
    });
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

    await infos(req, res);

    expect(prisma.utilisateur.findUnique).toHaveBeenCalledWith({
      where: { idUtilisateur: 2 },
      select: { nom: true, prenom: true },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Utilisateur non trouvé" });
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

    await infos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de la récupération du profil" });
  });
});
