const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require('joi');
const gardiennageSchema = require('../schemas/gardiennageSchema');

const convertirDate = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('-');
    return new Date(`${year}-${month}-${day}T00:00:00.000Z`).toISOString();
}

const ajouter = async (req, res) => {
    try {
        const { dateDebut, dateFin, idPlante } = req.query;
        const idPlanteInt = parseInt(idPlante, 10);

                // Valider les données avec Joi
                const { error, value } = gardiennageSchema.validate({
                    dateDebut: convertirDate(dateDebut),
                    dateFin: convertirDate(dateFin),
                    idPlante: idPlanteInt
                });

                if (error) {
                    return res.status(400).json({ error: error.details });
                }

        if (!dateDebut || !dateFin) {
            return res.status(400).json({ error: 'Date de début et date de fin sont requises' });
        }

        const dateDebutConverted = convertirDate(dateDebut);
        const dateFinConverted = convertirDate(dateFin);

        if (!dateDebutConverted || !dateFinConverted) {
            return res.status(400).json({ error: 'Dates invalides' });
        }

        const newGardiennage = await prisma.gardiennage.create({
            data: {
                dateDebut: dateDebutConverted,
                dateFin: dateFinConverted,
                idUtilisateur: null,
                idPlante: idPlanteInt
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
