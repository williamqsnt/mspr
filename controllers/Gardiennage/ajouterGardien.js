const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ajouter un gardien à un gardiennage
const ajouterGardien = async (req, res) => {
    console.log("Ajouter gardien route", req);

    try {
        const { idGardiennage } = req.params;
        const { idUtilisateur } = req.body;

        const updatedGardiennage = await prisma.gardiennage.update({
            where: {
                idGardiennage: parseInt(idGardiennage)
            },
            data: {
                idUtilisateur
            },
        });

        res.status(200).json({ message: "Gardien ajouté au gardiennage", gardiennage: updatedGardiennage });
    } catch (error) {
        console.error("Erreur lors de l'ajout du gardien au gardiennage:", error.message);
        res.status(500).json({ error: "Erreur lors de l'ajout du gardien au gardiennage" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = ajouterGardien;