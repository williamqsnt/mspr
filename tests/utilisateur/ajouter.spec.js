const ajouter = require('../../controllers/Utilisateur/ajouter');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { encrypt } = require('../../utils/cryptoUtils');

jest.mock('@prisma/client');
jest.mock('bcryptjs');
jest.mock('../../utils/cryptoUtils');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    utilisateur: {
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

  it('should create a new user and return a 200 status', async () => {
    const mockUser = {
      nom: 'encryptedNom',
      prenom: 'encryptedPrenom',
      dateNaissance: 'encryptedDateDeNaissance',
      numero: 'encryptedNum',
      email: 'encryptedEmail',
      adresse: 'encryptedAdresse',
      pseudo: 'testuser',
      motDePasse: 'hashedPassword',
    };

    encrypt.mockImplementation(value => `encrypted${value}`);
    bcrypt.hash.mockResolvedValue('hashedPassword');
    prisma.utilisateur.create.mockResolvedValue(mockUser);

    const req = {
      body: {
        nom: 'NomTest',
        prenom: 'PrenomTest',
        dateNaissance: '1990-01-01',
        motDePasse: 'password123',
        numero: '0123456789',
        email: 'test@example.com',
        adresse: '123 Rue Test',
        pseudo: 'testuser',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouter(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(encrypt).toHaveBeenCalledTimes(5); // Each field should be encrypted
    expect(prisma.utilisateur.create).toHaveBeenCalledWith({
      data: {
        nom: 'encryptedNomTest',
        prenom: 'encryptedPrenomTest',
        dateNaissance: 'encrypted1990-01-01',
        numero: 'encrypted0123456789',
        email: 'encryptedtest@example.com',
        pseudo: 'testuser',
        motDePasse: 'hashedPassword',
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur créé" });
  });

  it('should return a 500 status if there is an error', async () => {
    prisma.utilisateur.create.mockRejectedValue(new Error('Database error'));

    const req = {
      body: {
        nom: 'NomTest',
        prenom: 'PrenomTest',
        dateNaissance: '1990-01-01',
        motDePasse: 'password123',
        numero: '0123456789',
        email: 'test@example.com',
        adresse: '123 Rue Test',
        pseudo: 'testuser',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouter(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erreur lors de la création de l'utilisateur",
      errorMessage: 'Database error',
    });
  });
});
