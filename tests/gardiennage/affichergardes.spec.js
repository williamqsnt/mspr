const afficherGardes = require('../../controllers/Gardiennage/afficherGardes');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    gardiennage: {
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('afficherGardes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return gardiennages for the user', async () => {
    const mockGardiennages = [
      { idGardiennage: 1, idUtilisateur: 1, details: 'Details 1' },
      { idGardiennage: 2, idUtilisateur: 1, details: 'Details 2' },
    ];

    prisma.gardiennage.findMany.mockResolvedValue(mockGardiennages);

    const req = {
      query: {
        idUtilisateur: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await afficherGardes(req, res);

    expect(prisma.gardiennage.findMany).toHaveBeenCalledWith({
      where: {
        idUtilisateur: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Gardiennages récupérés",
      gardiennages: mockGardiennages,
    });
  });

  it('should return a 500 error if an exception is thrown', async () => {
    prisma.gardiennage.findMany.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        idUtilisateur: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await afficherGardes(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de la récupération des gardiennages" });
  });
});
