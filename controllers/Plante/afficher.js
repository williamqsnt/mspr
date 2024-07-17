const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Afficher une plante par id
const afficher = async (req, res) => {
    console.log("Afficher une plante route", req);

    try {
        const { idPlante } = req.params;

        const plantes = await prisma.plante.findMany({
            where: {
                idPlante: parseInt(idPlante, 10),
            },
        });

        res.status(200).json({ plantes });
    } catch (error) {
        console.error("Erreur lors de l'affichage des plantes par id:", error.message);
        res.status(500).json({ error: "Erreur lors de l'affichage des plantes par id" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = afficher;