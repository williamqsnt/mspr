const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const supprimer = async (req, res) => {
    console.log("Supprimer utilisateur route",req);

  const pseudo = req.params.pseudo;

  try {
      const deletedUser = await prisma.user.update({
        where: {
          pseudo: pseudo,
        },
        data: {
          password: 'archived',
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