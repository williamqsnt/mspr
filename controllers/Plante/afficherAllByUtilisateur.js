const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Afficher toutes les plantes en fonction de l'idUtilisateur
const afficherAllByUtilisateur = async (req, res) => {
    console.log("Afficher toutes les plantes par utilisateur route", req);

    try {
        const { idUtilisateur } = req.query;

        const plantes = await prisma.plante.findMany({
            where: {
                idUtilisateur: parseInt(idUtilisateur, 10),
            },
        });

        res.status(200).json({ plantes });
    } catch (error) {
        console.error("Erreur lors de l'affichage des plantes par utilisateur:", error.message);
        res.status(500).json({ error: "Erreur lors de l'affichage des plantes par utilisateur" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = afficherAllByUtilisateur;