const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const supprimer = async (req, res) => {
    console.log("Supprimer utilisateur route",req);

  const { pseudo } = req.query;

  try {
      const deletedUser = await prisma.utilisateur.update({
        where: {
          pseudo: pseudo,
        },
        data: {
          motDePasse: 'archived',
        },
      });
    res.status(200).json({ message: "Utilisateur supprimé" });

  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la suppression de l'utilisateur"
    });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = supprimer;