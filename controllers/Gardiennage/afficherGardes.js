const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Afficher les gardiennages pour un utilisateur
exports.afficherGardes = async (req, res) => {
    console.log("Afficher gardiennages route", req);

    try {
        const { idUtilisateur } = req.params;

        const gardiennages = await prisma.gardiennage.findMany({
            where: {
                idUtilisateur: parseInt(idUtilisateur)
            }
        });

        res.status(200).json({ message: "Gardiennages récupérés", gardiennages });
    } catch (error) {
        console.error("Erreur lors de la récupération des gardiennages:", error.message);
        res.status(500).json({ error: "Erreur lors de la récupération des gardiennages" });
    } finally {
        await prisma.$disconnect();
    }
};
