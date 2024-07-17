const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Supprimer une relation AvoirRole
exports.supprimerAvoirRole = async (req, res) => {
    console.log("Supprimer AvoirRole route", req);

    try {
        const { idUtilisateur, idRole } = req.body;

        await prisma.avoirRole.delete({
            where: {
                idUtilisateur_idRole: {
                    idUtilisateur: parseInt(idUtilisateur),
                    idRole: parseInt(idRole)
                }
            },
        });

        res.status(200).json({ message: "Relation AvoirRole supprimée" });
    } catch (error) {
        console.error("Erreur lors de la suppression de la relation AvoirRole:", error.message);
        res.status(500).json({ error: "Erreur lors de la suppression de la relation AvoirRole" });
    } finally {
        await prisma.$disconnect();
    }
};
