const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Récupérer les conseils pour une plante
const afficher = async (req, res) => {
    console.log("afficher conseils par plante route", req);

    try {
        const { idPlante } = req.params;

        const conseils = await prisma.conseil.findMany({
            where: {
                idPlante: parseInt(idPlante)
            },
            include: {
                utilisateur: true
            }
        });

        res.status(200).json({ message: "Conseils récupérés", conseils });
    } catch (error) {
        console.error("Erreur lors de la récupération des conseils:", error.message);
        res.status(500).json({ error: "Erreur lors de la récupération des conseils" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = afficher;