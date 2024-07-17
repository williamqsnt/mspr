const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
const crypto = require('crypto');


const encryptionKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Ajouter un utilisateur
const ajouter = async (req, res) => {
  console.log("Ajouter utilisateur route",req);

  let salt = bcrypt.genSaltSync(10);

  try {
    const { nom, prenom, dateNaissance, motDePasse, numero, email, adresse} = req.query;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(motDePasse, saltRounds);
    const encryptedNom = encrypt(nom);
    const encryptedPrenom = encrypt(prenom);
    const encryptedDateDeNaissance = encrypt(dateNaissance.toString());
    const encryptedNum = encrypt(numero);
    const encryptedEmail = encrypt(email);
    const encryptedAdresse = encrypt(adresse);

      const newUtilisateur = await prisma.utilisateur.create({
        data: {
            encryptedNom,
            encryptedPrenom,
            encryptedDateDeNaissance,
            encryptedNum,
            encryptedEmail,
            encryptedAdresse,
            pseudo,
            hashedPassword
        },
      });
      res.status(200).json({ message: "Utilisateur créé" });
    } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la création de l'utilisateur",
    });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = ajouter;