const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Supprimer une plante
const supprimer = async (req, res) => {
    console.log("Supprimer plante route", req);

    try {
        const { idPlante } = req.params;

        await prisma.plante.delete({
            where: {
                idPlante: parseInt(idPlante, 10),
            },
        });

        res.status(200).json({ message: "Plante supprimée" });
    } catch (error) {
        console.error("Erreur lors de la suppression de la plante:", error.message);
        res.status(500).json({ error: "Erreur lors de la suppression de la plante" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = supprimer;