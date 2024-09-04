const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Modifier une plante
const modifier = async (req, res) => {
    console.log("Modifier plante route", req);

    try {
        const { idPlante, idEspece, description, nom, adresse } = req.query;

        const idEspeceInt = parseInt(idEspece, 10);

        const updatedPlante = await prisma.plante.update({
            where: {
                idPlante: parseInt(idPlante, 10),
            },
            data: {
                idEspece: idEspeceInt,
                description,
                nom,
                adresse
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
