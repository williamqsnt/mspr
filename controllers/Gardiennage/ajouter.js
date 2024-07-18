const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const convertirDate = (dateStr) => {
    const [jour, mois, annee] = dateStr.split('/');
    return new Date(`${annee}-${mois}-${jour}T00:00:00.000Z`).toISOString();
}

// Ajouter un gardiennage
const ajouter = async (req, res) => {
    console.log("Ajouter gardiennage route", req);

    try {
        const { dateDebut, dateFin, idPlante } = req.query;
        const idPlanteInt = parseInt(idPlante, 10); // base 10

        const dateDebutConverted = convertirDate(dateDebut);
        const dateFinConverted = convertirDate(dateFin);

        const newGardiennage = await prisma.gardiennage.create({
            data: {
                dateDebut: dateDebutConverted,
                dateFin: dateFinConverted,
                idUtilisateur : null,
                idPlante : idPlanteInt
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