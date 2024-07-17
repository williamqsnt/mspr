const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Afficher les conversations pour un utilisateur
const afficher = async (req, res) => {
    console.log("Afficher conversations route", req);

    try {
        const { idUtilisateur } = req.query;

        const conversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    { idUtilisateur: parseInt(idUtilisateur) },
                    { idUtilisateur_1: parseInt(idUtilisateur) }
                ]
            }
        });

        res.status(200).json({ message: "Conversations récupérées", conversations });
    } catch (error) {
        console.error("Erreur lors de la récupération des conversations:", error.message);
        res.status(500).json({ error: "Erreur lors de la récupération des conversations" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = afficher;