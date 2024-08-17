const modifier = require('../../controllers/Plante/modifier');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    plante: {
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('modifier', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a plant and return the updated plant', async () => {
    const mockUpdatedPlante = {
      idPlante: 1,
      espece: 'Rose',
      description: 'Beautiful rose plant',
      nom: 'Rose',
      adresse: '123 Rue des Roses',
    };

    prisma.plante.update.mockResolvedValue(mockUpdatedPlante);

    const req = {
      query: {
        idPlante: '1',
        espece: 'Rose',
        description: 'Beautiful rose plant',
        nom: 'Rose',
        adresse: '123 Rue des Roses',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await modifier(req, res);

    expect(prisma.plante.update).toHaveBeenCalledWith({
      where: {
        idPlante: 1,
      },
      data: {
        espece: 'Rose',
        description: 'Beautiful rose plant',
        nom: 'Rose',
        adresse: '123 Rue des Roses',
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Plante modifiée',
      plante: mockUpdatedPlante,
    });
  });

  it('should return a 500 status if there is an error', async () => {
    prisma.plante.update.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        idPlante: '1',
        espece: 'Rose',
        description: 'Beautiful rose plant',
        nom: 'Rose',
        adresse: '123 Rue des Roses',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await modifier(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erreur lors de la modification de la plante',
    });
  });
});
