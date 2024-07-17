const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Afficher tous les messages en fonction de l'idConversation
const recupererAll = async (req, res) => {
    console.log("Afficher tous les messages route", req);

    try {
        const { idConversation } = req.params;

        const messages = await prisma.message.findMany({
            where: {
                idConversation: parseInt(idConversation, 10),
            },
            orderBy: {
                dateEnvoi: 'asc',
            },
        });

        res.status(200).json({ messages });
    } catch (error) {
        console.error("Erreur lors de l'affichage des messages:", error.message);
        res.status(500).json({ error: "Erreur lors de l'affichage des messages" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = recupererAll;