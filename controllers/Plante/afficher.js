const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Afficher une plante par id
const afficher = async (req, res) => {
    console.log("Afficher une plante route", req);

    try {
        const { idPlante } = req.query;

        // Utilisation de findUnique pour rechercher une plante par ID
        const plante = await prisma.plante.findUnique({
            where: {
                idPlante: parseInt(idPlante, 10),
            },
            include: {
                // Inclure les gardiennages associés à la plante
                gardiennages: {
                    where: {
                        idUtilisateur: null,
                    },
                    select: {
                        idGardiennage: true,
                        dateDebut: true,
                        dateFin: true
                    },
                },
            },
        });

        if (!plante) {
            return res.status(404).json({ error: "Plante non trouvée" });
        }

        res.status(200).json({ plante });
    } catch (error) {
        console.error("Erreur lors de l'affichage de la plante par id:", error.message);
        res.status(500).json({ error: "Erreur lors de l'affichage de la plante par id" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = afficher;
