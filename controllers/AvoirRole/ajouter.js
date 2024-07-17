const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// Ajouter une relation AvoirRole
const ajouter = async (req, res) => {
    console.log("Ajouter AvoirRole route", req);

    try {
        const { idUtilisateur, idRole } = req.query;
        const idUtilisateurInt = parseInt(idUtilisateur, 10); // base 10
        const idRoleInt = parseInt(idRole, 10);

        const newAvoirRole = await prisma.avoirRole.create({
            data: {
                idUtilisateur : idUtilisateurInt,
                idRole : idRoleInt
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

module.exports = ajouter;