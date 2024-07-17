const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ajouter une relation AvoirRole
exports.ajouterAvoirRole = async (req, res) => {
    console.log("Ajouter AvoirRole route", req);

    try {
        const { idUtilisateur, idRole } = req.body;

        const newAvoirRole = await prisma.avoirRole.create({
            data: {
                idUtilisateur,
                idRole
            },
        });

        res.status(200).json({ message: "Relation AvoirRole créée", avoirRole: newAvoirRole });
    } catch (error) {
        console.error("Erreur lors de la création de la relation AvoirRole:", error.message);
        res.status(500).json({ error: "Erreur lors de la création de la relation AvoirRole" });
    } finally {
        await prisma.$disconnect();
    }
};
