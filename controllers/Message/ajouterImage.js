const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ajouter un message avec une image
const ajouterImage = async (req, res) => {
    console.log("Ajouter message avec image route", req);

    try {
        const { image, idUtilisateur, idConversation } = req.query;
        const idUtilisateurInt = parseInt(idUtilisateur, 10);
        const idConversationInt = parseInt(idConversation, 10);

        // Utiliser la date et l'heure actuelles
        const dateEnvoi = new Date().toISOString();

        // Le texte est toujours "#image"
        const texte = "#image";

        const newMessage = await prisma.message.create({
            data: {
                dateEnvoi,
                texte,
                image,
                idUtilisateur : idUtilisateurInt,
                idConversation : idConversationInt
            },
        });

        res.status(200).json({ message: "Message avec image créé", message: newMessage });
    } catch (error) {
        console.error("Erreur lors de la création du message avec image:", error.message);
        res.status(500).json({ error: "Erreur lors de la création du message avec image" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = ajouterImage;
