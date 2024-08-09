const Joi = require('joi');

const utilisateurSchema = Joi.object({
  nom: Joi.string().max(500).required(),
  prenom: Joi.string().max(500).required(),
  dateNaissance: Joi.string().max(500).required(),
  numero: Joi.string().max(500).required(),
  email: Joi.string().email().max(500).required(),
  adresse: Joi.string().max(500).required(),
  pseudo: Joi.string().max(500).required(),
  motDePasse: Joi.string().max(500).required(),
  estBotaniste: Joi.boolean().default(false)
});

module.exports = utilisateurSchema;
