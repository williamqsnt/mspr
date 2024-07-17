const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Récupérer le pseudo de l'utilisateur en fonction de l'ID
exports.recupererPseudo = async (req, res) => {
    console.log("Récupérer pseudo utilisateur par ID route", req);

    try {
        const { idUtilisateur } = req.params;

        const utilisateur = await prisma.utilisateur.findUnique({
            where: {
                idUtilisateur: parseInt(idUtilisateur, 10),
            },
            select: {
                pseudo: true,
            },
        });

        if (utilisateur) {
            res.status(200).json({ pseudo: utilisateur.pseudo });
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du pseudo utilisateur:", error.message);
        res.status(500).json({ error: "Erreur lors de la récupération du pseudo utilisateur" });
    } finally {
        await prisma.$disconnect();
    }
};
