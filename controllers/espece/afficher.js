const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Afficher toutes les plantes
const afficherAll = async (req, res) => {
    console.log("Afficher toutes les especes route", req);

    try {
        const especes = await prisma.espece.findMany();

        res.status(200).json({ especes });
    } catch (error) {
        console.error("Erreur lors de l'affichage des especes:", error.message);
        res.status(500).json({ error: "Erreur lors de l'affichage des especes" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = afficherAll;