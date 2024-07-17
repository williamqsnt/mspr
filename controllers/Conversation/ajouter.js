const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ajouter une conversation
exports.ajouterConversation = async (req, res) => {
    console.log("Ajouter conversation route", req);

    try {
        const {
            idUtilisateur,
            idUtilisateur_1,
            idGardiennage
        } = req.body;

        const newConversation = await prisma.conversation.create({
            data: {
                idUtilisateur,
                idUtilisateur_1,
                idGardiennage
            },
        });

        res.status(200).json({ message: "Conversation créée", conversation: newConversation });
    } catch (error) {
        console.error("Erreur lors de la création de la conversation:", error.message);
        res.status(500).json({ error: "Erreur lors de la création de la conversation" });
    } finally {
        await prisma.$disconnect();
    }
};
