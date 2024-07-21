const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
const crypto = require('crypto');

const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'utf-8');

function decrypt(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


// Récupérer un utilisateur
const recuperer = async (req, res) => {
  console.log("Récupérer utilisateur route", req);

  try {
    const { idUtilisateur } = req.query;

    const utilisateur = await prisma.utilisateur.findUnique({
      where: {
        idUtilisateur: parseInt(idUtilisateur),
      },
    });

    if (!utilisateur) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const decryptedNom = decrypt(utilisateur.nom);
    const decryptedPrenom = decrypt(utilisateur.prenom);
    const decryptedDateDeNaissance = decrypt(utilisateur.dateNaissance);
    const decryptedNum = decrypt(utilisateur.numero);
    const decryptedEmail = decrypt(utilisateur.email);
    const decryptedAdresse = decrypt(utilisateur.adresse);

    res.status(200).json({
      id: utilisateur.id,
      nom: decryptedNom,
      prenom: decryptedPrenom,
      dateNaissance: decryptedDateDeNaissance,
      numero: decryptedNum,
      email: decryptedEmail,
      adresse: decryptedAdresse,
      pseudo: utilisateur.pseudo,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération de l'utilisateur",
      errorMessage: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = recuperer;
