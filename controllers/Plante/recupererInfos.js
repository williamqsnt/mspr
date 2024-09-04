const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Afficher les adresses des plantes sans gardien
const recupererInfos = async (req, res) => {
    console.log("Afficher les adresses des plantes sans gardiennage route", req);

    try {
        const plantes = await prisma.plante.findMany({
            where: {
                gardiennages: {
                    some: {
                        idUtilisateur: null,
                    },
                },
            },include: {
                espece: {
                    select: {
                        libelle: true,
                    },
                },
            },
        });

        res.status(200).json({ plantes });
    } catch (error) {
        console.error("Erreur lors de l'affichage des adresses:", error.message);
        res.status(500).json({ error: "Erreur lors de l'affichage des adresses" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = recupererInfos;