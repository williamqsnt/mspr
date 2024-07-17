const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Modifier un rôle
exports.modifierRole = async (req, res) => {
    console.log("Modifier rôle route", req);

    try {
        const { idRole, libelle } = req.params;

        const updatedRole = await prisma.role.update({
            where: {
                idRole: parseInt(idRole)
            },
            data: {
                libelle
            },
        });

        res.status(200).json({ message: "Rôle modifié", role: updatedRole });
    } catch (error) {
        console.error("Erreur lors de la modification du rôle:", error.message);
        res.status(500).json({ error: "Erreur lors de la modification du rôle" });
    } finally {
        await prisma.$disconnect();
    }
};
