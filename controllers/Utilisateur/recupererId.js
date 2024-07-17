const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Récupérer l'ID de l'utilisateur en fonction du pseudo
const recupererId = async (req, res) => {
    console.log("Récupérer ID utilisateur par pseudo route", req);

    try {
        const { pseudo } = req.params;

        const utilisateur = await prisma.utilisateur.findUnique({
            where: {
                pseudo: pseudo,
            },
            select: {
                idUtilisateur: true,
            },
        });

        if (utilisateur) {
            res.status(200).json({ idUtilisateur: utilisateur.idUtilisateur });
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'ID utilisateur:", error.message);
        res.status(500).json({ error: "Erreur lors de la récupération de l'ID utilisateur" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = recupererId;