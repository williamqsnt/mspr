const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Afficher toutes les plantes
const afficherAllPlantes = async (req, res) => {
    console.log("Afficher toutes les plantes route", req);

    try {
        const plantes = await prisma.plante.findMany();

        res.status(200).json({ plantes });
    } catch (error) {
        console.error("Erreur lors de l'affichage des plantes:", error.message);
        res.status(500).json({ error: "Erreur lors de l'affichage des plantes" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = afficherAllPlantes;