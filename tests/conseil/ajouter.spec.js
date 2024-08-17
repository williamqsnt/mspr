const ajouter = require('../../controllers/Conseil/ajouter');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    conseil: {
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

  it('should add a new conseil and return success message', async () => {
    const mockConseil = {
      idConseil: 1,
      description: 'Arroser régulièrement',
      idPlante: 1,
      idUtilisateur: 1,
    };
    prisma.conseil.create.mockResolvedValue(mockConseil);

    const req = {
      query: {
        description: 'Arroser régulièrement',
        idPlante: '1',
        idUtilisateur: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouter(req, res);

    expect(prisma.conseil.create).toHaveBeenCalledWith({
      data: {
        description: 'Arroser régulièrement',
        idPlante: 1,
        idUtilisateur: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Conseil ajouté",
      conseil: mockConseil,
    });
  });

  it('should return a 500 error if an exception is thrown', async () => {
    prisma.conseil.create.mockRejectedValue(new Error('Database error'));

    const req = {
      query: {
        description: 'Arroser régulièrement',
        idPlante: '1',
        idUtilisateur: '1',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ajouter(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de l'ajout du conseil" });
  });
});
