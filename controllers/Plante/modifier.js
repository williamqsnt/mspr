const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Modifier une plante
const modifier = async (req, res) => {
    console.log("Modifier plante route", req);

    try {
        const { idPlante, espece, description, nom, adresse, idUtilisateur } = req.params;

        const updatedPlante = await prisma.plante.update({
            where: {
                idPlante: parseInt(idPlante, 10),
            },
            data: {
                espece,
                description,
                nom,
                adresse,
                idUtilisateur,
            },
        });

        res.status(200).json({ message: "Plante modifiée", plante: updatedPlante });
    } catch (error) {
        console.error("Erreur lors de la modification de la plante:", error.message);
        res.status(500).json({ error: "Erreur lors de la modification de la plante" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = modifier;
