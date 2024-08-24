const ajouter = require('../../controllers/Gardiennage/ajouter');
const { PrismaClient } = require('@prisma/client');
const Joi = require('joi');

// Mock du module PrismaClient
jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    gardiennage: {
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

  it('should create a new gardiennage with valid dates', async () => {
    const mockGardiennage = {
      idGardiennage: 1,
      dateDebut: '2024-01-01T00:00:00.000Z',
      dateFin: '2024-01-15T00:00:00.000Z',
      idPlante: 1,
      idUtilisateur: null,
    };

    prisma.gardiennage.create.mockResolvedValue(mockGardiennage);

    const req = {
      query: {
        dateDebut: '2024-01-01',
        dateFin: '2024-01-15',
        idPlante: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouter(req, res);

    expect(prisma.gardiennage.create).toHaveBeenCalledWith({
      data: {
        dateDebut: '2024-01-01T00:00:00.000Z',
        dateFin: '2024-01-15T00:00:00.000Z',
        idPlante: 1,
        idUtilisateur: null,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Gardiennage créé",
      gardiennage: mockGardiennage,
    });
  });


    

  it('should return a 500 error if there is a database error', async () => {
    prisma.gardiennage.create.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        dateDebut: '2024-01-01',
        dateFin: '2024-01-15',
        idPlante: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouter(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de la création du gardiennage" });
  });
});
