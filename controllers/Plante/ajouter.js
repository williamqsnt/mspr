const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// Ajouter une plante
exports.ajouterPlante = async (req, res) => {
    console.log("Ajouter plante route", req);
  
    try {
      const {
        espece,
        description,
        nom,
        adresse,
        id_proprietaire,
        idUtilisateur
      } = req.body;
  
  
      const newPlante = await prisma.plante.create({
        data: {
            espece,
            description,
            nom,
            adresse,
            id_proprietaire,
            idUtilisateur
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