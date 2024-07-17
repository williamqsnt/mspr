const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ajouter un rôle
exports.ajouterRole = async (req, res) => {
    console.log("Ajouter rôle route", req);

    try {
        const { libelle } = req.body;

        const newRole = await prisma.role.create({
            data: {
                libelle
            },
        });

        res.status(200).json({ message: "Rôle créé", role: newRole });
    } catch (error) {
        console.error("Erreur lors de la création du rôle:", error.message);
        res.status(500).json({ error: "Erreur lors de la création du rôle" });
    } finally {
        await prisma.$disconnect();
    }
};
