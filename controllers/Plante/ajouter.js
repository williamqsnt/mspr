const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ajouter une plante avec photoUrl
const ajouter = async (req, res) => {
  console.log("Ajouter plante route", req);

  try {
    const {
      idEspece,
      description,
      nom,
      adresse,
      idUtilisateur,
      photoUrl // Ajout de photoUrl dans les paramètres de la requête
    } = req.query;

    const idUtilisateurInt = parseInt(idUtilisateur, 10);
    const idEspeceInt = parseInt(idEspece, 10);

    const newPlante = await prisma.plante.create({
      data: {
        idEspece: idEspeceInt,
        description,
        nom,
        adresse,
        idUtilisateur: idUtilisateurInt,
        photoUrl // Inclure photoUrl dans la création de la plante
      },
    });

    res.status(200).json({ message: "Plante créée", plante: newPlante });
  } catch (error) {
    console.error("Erreur lors de la création de la plante:", error.message);
    res.status(500).json({ error: "Erreur lors de la création de la plante" });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = ajouter;
