const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ajouter une conversation
const ajouter = async (req, res) => {
    console.log("Ajouter conversation route", req);

    try {
        const {
            idUtilisateur,
            idUtilisateur_1,
            idGardiennage
        } = req.query;

        const idUtilisateurInt = parseInt(idUtilisateur, 10); // base 10
        const idUtilisateur_1Int = parseInt(idUtilisateur_1, 10);
        const idGardiennageInt = parseInt(idGardiennage, 10);

        const newConversation = await prisma.conversation.create({
            data: {
                idUtilisateur : idUtilisateurInt,
                idUtilisateur_1 : idUtilisateur_1Int,
                idGardiennage : idGardiennageInt
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

module.exports = ajouter;