const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const JWT_SECRET = process.env.JWT_SECRET;

// Vérifier si le pseudo et le mot de passe correspondent
const verifier = async (req, res) => {
    console.log("Vérifier pseudo et mot de passe route", req);

    try {
        const { pseudo, motDePasse } = req.query;

        const utilisateur = await prisma.utilisateur.findUnique({
            where: {
                pseudo: pseudo,
            },
        });

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        const motDePasseCorrect = await bcrypt.compare(motDePasse, utilisateur.motDePasse);

        if (motDePasseCorrect) {
            const token = jwt.sign({ pseudo: utilisateur.pseudo }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: "Authentification réussie", token: token });
        } else {
            res.status(401).json({ error: "Mot de passe incorrect" });
        }
    } catch (error) {
        console.error("Erreur lors de la vérification du mot de passe:", error.message);
        res.status(500).json({ error: "Erreur lors de la vérification du mot de passe" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = verifier;