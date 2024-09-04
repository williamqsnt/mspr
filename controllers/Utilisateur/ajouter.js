const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
const { encrypt } = require('../../utils/cryptoUtils');

// Ajouter un utilisateur
const ajouter = async (req, res) => {
  console.log("Ajouter utilisateur route",req);

  let salt = bcrypt.genSaltSync(10);

  try {
    const { nom, prenom, dateNaissance, motDePasse, numero, email, pseudo} = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(motDePasse, saltRounds);
    const encryptedNom = encrypt(nom);
    const encryptedPrenom = encrypt(prenom);
    const encryptedDateDeNaissance = encrypt(dateNaissance);
    const encryptedNum = encrypt(numero);
    const encryptedEmail = encrypt(email);

        // Log the lengths of the encrypted fields
        console.log("Length of encryptedNom: ", encryptedNom.length);
        console.log("Length of encryptedPrenom: ", encryptedPrenom.length);
        console.log("Length of encryptedDateDeNaissance: ", encryptedDateDeNaissance.length);
        console.log("Length of encryptedNum: ", encryptedNum.length);
        console.log("Length of encryptedEmail: ", encryptedEmail.length);
        console.log("Length of pseudo: ", pseudo.length);
        console.log("Length of hashedPassword: ", hashedPassword.length);

      const newUtilisateur = await prisma.utilisateur.create({
        data: {
            nom : encryptedNom,
            prenom : encryptedPrenom,
            dateNaissance : encryptedDateDeNaissance,
            numero : encryptedNum,
            email : encryptedEmail,
            pseudo,
            motDePasse : hashedPassword
        },
      });
      res.status(200).json({ message: "Utilisateur créé" });
    } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la création de l'utilisateur",
      errorMessage: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = ajouter;