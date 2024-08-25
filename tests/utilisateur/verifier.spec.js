const verifier = require('../../controllers/Utilisateur/verifier');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('@prisma/client');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    utilisateur: {
      findUnique: jest.fn(),
    },
    $disconnect: jest.fn(), // Mock de la méthode $disconnect
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});


jest.mock('@prisma/client');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('verifier', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a 404 error if the user is not found', async () => {
    prisma.utilisateur.findUnique.mockResolvedValue(null);

    const req = { body: { pseudo: 'testuser', motDePasse: 'password123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await verifier(req, res);

    expect(prisma.utilisateur.findUnique).toHaveBeenCalledWith({
      where: { pseudo: 'testuser' },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Utilisateur non trouvé" });
  });

  it('should return a 401 error if the password is incorrect', async () => {
    prisma.utilisateur.findUnique.mockResolvedValue({ pseudo: 'testuser', motDePasse: 'hashedpassword' });
    bcrypt.compare.mockResolvedValue(false);

    const req = { body: { pseudo: 'testuser', motDePasse: 'wrongpassword' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await verifier(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashedpassword');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Mot de passe incorrect" });
  });

  it('should return a 200 status with a token if authentication succeeds', async () => {
    const mockToken = 'mockedtoken';
    prisma.utilisateur.findUnique.mockResolvedValue({ idUtilisateur: 1, pseudo: 'testuser', motDePasse: 'hashedpassword' });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue(mockToken);

    const req = { body: { pseudo: 'testuser', motDePasse: 'password123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await verifier(req, res);

    expect(jwt.sign).toHaveBeenCalledWith({ pseudo: 'testuser' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Authentification réussie",
      token: mockToken,
      idUtilisateur: 1,
    });
  });

  it('should return a 500 error if an exception is thrown', async () => {
    prisma.utilisateur.findUnique.mockRejectedValue(new Error('Database error'));

    const req = { body: { pseudo: 'testuser', motDePasse: 'password123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await verifier(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de la vérification du mot de passe" });
  });
});
