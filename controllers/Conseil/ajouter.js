const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ajouter un conseil
const ajouter = async (req, res) => {
    console.log("Ajouter conseil route", req);

    try {
        const { description, idPlante, idUtilisateur } = req.query;
        const idPlanteInt = parseInt(idPlante, 10); // base 10
        const idUtilisateurInt = parseInt(idUtilisateur, 10);

        const newConseil = await prisma.conseil.create({
            data: {
                description,
                idPlante : idPlanteInt,
                idUtilisateur : idUtilisateurInt
            },
        });

        res.status(200).json({ message: "Conseil ajouté", conseil: newConseil });
    } catch (error) {
        console.error("Erreur lors de l'ajout du conseil:", error.message);
        res.status(500).json({ error: "Erreur lors de l'ajout du conseil" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = ajouter;