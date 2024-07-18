const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ajouter un message
const ajouter = async (req, res) => {
    console.log("Ajouter message route", req);

    try {
        const { contenu, idUtilisateur, idConversation } = req.query;
        const idConversationInt = parseInt(idConversation, 10); // base 10
        const idUtilisateurInt = parseInt(idUtilisateur, 10);

        // Utiliser la date et l'heure actuelles
        const dateEnvoi = new Date().toISOString();

        const newMessage = await prisma.message.create({
            data: {
                dateEnvoi,
                contenu,
                idUtilisateur : idUtilisateurInt,
                idConversation : idConversationInt
            },
        });

        res.status(200).json({ message: "Message créé", message: newMessage });
    } catch (error) {
        console.error("Erreur lors de la création du message:", error.message);
        res.status(500).json({ error: "Erreur lors de la création du message" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = ajouter;