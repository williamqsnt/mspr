const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ajouter un gardiennage
const ajouter = async (req, res) => {
    console.log("Ajouter gardiennage route", req);

    try {
        const { dateDebut, dateFin, idPlante } = req.body;

        const newGardiennage = await prisma.gardiennage.create({
            data: {
                dateDebut: new Date(dateDebut),
                dateFin: new Date(dateFin),
                idUtilisateur : null,
                idPlante
            },
        });

        res.status(200).json({ message: "Gardiennage créé", gardiennage: newGardiennage });
    } catch (error) {
        console.error("Erreur lors de la création du gardiennage:", error.message);
        res.status(500).json({ error: "Erreur lors de la création du gardiennage" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = ajouter;