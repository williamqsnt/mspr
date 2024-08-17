const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Récupérer la photo d'une plante associée à une conversation via l'ID du gardiennage
const recupererPhotoPlante = async (req, res) => {
    console.log("Récupérer la photo de la plante associée à la conversation", req.params);

    const { idConversation } = req.query;

    try {
        // Récupérer l'ID du gardiennage à partir de l'ID de la conversation
        const conversation = await prisma.conversation.findUnique({
            where: {
                idConversation: parseInt(idConversation),
            },
            select: {
                gardiennage: {
                    select: {
                        idPlante: true,
                    },
                },
            },
        });

        if (!conversation || !conversation.gardiennage) {
            return res.status(404).json({ error: "Conversation ou gardiennage non trouvé" });
        }

        const { idPlante } = conversation.gardiennage;

        // Récupérer la photo de la plante via l'ID de la plante
        const plante = await prisma.plante.findUnique({
            where: {
                idPlante: idPlante,
            },
            select: {
                photoUrl: true,
            },
        });

        if (!plante || !plante.photoUrl) {
            return res.status(404).json({ error: "Plante ou photo non trouvée" });
        }

        res.status(200).json({ photoUrl: plante.photoUrl });
    } catch (error) {
        console.error("Erreur lors de la récupération de la photo de la plante:", error.message);
        res.status(500).json({ error: "Erreur lors de la récupération de la photo de la plante" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = recupererPhotoPlante;
