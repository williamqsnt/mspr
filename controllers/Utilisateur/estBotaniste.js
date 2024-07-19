const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Récupérer le pseudo de l'utilisateur en fonction de l'ID
const estBotaniste = async (req, res) => {
    console.log("Récupérer si estbotaniste ID route", req);

    try {
        const { idUtilisateur } = req.query;

        const utilisateur = await prisma.utilisateur.findUnique({
            where: {
                idUtilisateur: parseInt(idUtilisateur, 10),
            },
            select: {
                estBotaniste: true,
            },
        });

        if (utilisateur) {
            res.status(200).json({ estBotaniste: utilisateur.estBotaniste });
        } else {
            res.status(404).json({ error: "Role non trouvé" });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du role utilisateur:", error.message);
        res.status(500).json({ error: "Erreur lors de la récupération du role utilisateur" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = estBotaniste;