const afficherAll = require('../../controllers/Plante/afficherAll');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    plante: {
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('afficherAll', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve all plants and return a 200 status', async () => {
    const mockPlantes = [
      { idPlante: 1, nom: 'Plante Test 1', description: 'Description de la plante 1' },
      { idPlante: 2, nom: 'Plante Test 2', description: 'Description de la plante 2' },
    ];

    prisma.plante.findMany.mockResolvedValue(mockPlantes);

    const req = {}; // No query parameters needed for this endpoint

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await afficherAll(req, res);

    expect(prisma.plante.findMany).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ plantes: mockPlantes });
  });

  it('should return a 500 status if there is an error', async () => {
    prisma.plante.findMany.mockRejectedValue(new Error('Database error'));

    const req = {}; // No query parameters needed for this endpoint

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await afficherAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erreur lors de l'affichage des plantes",
    });
  });
});
