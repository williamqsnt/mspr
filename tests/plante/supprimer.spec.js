const supprimer = require('../../controllers/Plante/supprimer');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    plante: {
      delete: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('supprimer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a plant and return a 200 status', async () => {
    prisma.plante.delete.mockResolvedValue({});

    const req = {
      query: {
        idPlante: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await supprimer(req, res);

    expect(prisma.plante.delete).toHaveBeenCalledWith({
      where: {
        idPlante: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Plante supprimée' });
  });

  it('should return a 500 status if there is an error', async () => {
    prisma.plante.delete.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        idPlante: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await supprimer(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erreur lors de la suppression de la plante',
    });
  });
});
