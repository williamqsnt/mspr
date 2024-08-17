const ajouterGardien = require('../../controllers/Gardiennage/ajouterGardien');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    gardiennage: {
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('ajouterGardien', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully add a guardian to a gardiennage', async () => {
    const mockGardiennage = {
      idGardiennage: 1,
      idUtilisateur: 123,
      dateDebut: '2024-01-01T00:00:00.000Z',
      dateFin: '2024-01-15T00:00:00.000Z',
      idPlante: 1,
    };

    prisma.gardiennage.update.mockResolvedValue(mockGardiennage);

    const req = {
      query: {
        idGardiennage: '1',
        idUtilisateur: '123',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouterGardien(req, res);

    expect(prisma.gardiennage.update).toHaveBeenCalledWith({
      where: {
        idGardiennage: 1,
      },
      data: {
        idUtilisateur: 123,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Gardien ajouté au gardiennage",
      gardiennage: mockGardiennage,
    });
  });

  it('should return a 500 error if there is a database error', async () => {
    prisma.gardiennage.update.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        idGardiennage: '1',
        idUtilisateur: '123',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouterGardien(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de l'ajout du gardien au gardiennage" });
  });

  it('should return a 400 error if idGardiennage or idUtilisateur are invalid', async () => {
    const req = {
      query: {
        idGardiennage: 'invalid-id',
        idUtilisateur: '123',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouterGardien(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de l'ajout du gardien au gardiennage" });
  });
});
