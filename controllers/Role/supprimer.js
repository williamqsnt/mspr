const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Supprimer un rôle
exports.supprimerRole = async (req, res) => {
    console.log("Supprimer rôle route", req);

    try {
        const { idRole } = req.params;

        await prisma.role.delete({
            where: {
                idRole: parseInt(idRole)
            },
        });

        res.status(200).json({ message: "Rôle supprimé" });
    } catch (error) {
        console.error("Erreur lors de la suppression du rôle:", error.message);
        res.status(500).json({ error: "Erreur lors de la suppression du rôle" });
    } finally {
        await prisma.$disconnect();
    }
};
