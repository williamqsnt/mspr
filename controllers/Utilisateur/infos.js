const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { decrypt } = require('../../utils/cryptoUtils');


const infos = async (req, res) => {
    console.log("Afficher profil route", req);

    try {
        const { idUtilisateur } = req.query;
        // Récupérer les informations de l'utilisateur
        const utilisateur = await prisma.utilisateur.findUnique({
            where: {
                idUtilisateur: parseInt(idUtilisateur)
            },
            select: {
                nom: true,
                prenom: true
            }
        });

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        utilisateur.nom = decrypt(utilisateur.nom);
        utilisateur.prenom = decrypt(utilisateur.prenom);

        // Récupérer les plantes de l'utilisateur
        const plantes = await prisma.plante.findMany({
            where: {
                idUtilisateur: parseInt(idUtilisateur)
            },
            select: {
                nom: true
            }
        });
        console.log('Utilisateur trouvé:', utilisateur);
        console.log('Plantes trouvées:', plantes);

        res.status(200).json({ message: "Profil récupéré", utilisateur, plantes });
    } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error.message);
        res.status(500).json({ error: "Erreur lors de la récupération du profil" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = infos ;
