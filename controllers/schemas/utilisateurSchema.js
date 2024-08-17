const Joi = require('joi');

const utilisateurSchema = Joi.object({
  nom: Joi.string().max(500).required()
    .messages({
      'string.base': 'Le nom doit être une chaîne de caractères.',
      'string.max': 'Le nom ne peut pas dépasser 500 caractères.',
      'any.required': 'Le nom est requis.'
    }),
  prenom: Joi.string().max(500).required()
    .messages({
      'string.base': 'Le prénom doit être une chaîne de caractères.',
      'string.max': 'Le prénom ne peut pas dépasser 500 caractères.',
      'any.required': 'Le prénom est requis.'
    }),
  dateNaissance: Joi.string().max(500).required()
    .messages({
      'string.base': 'La date de naissance doit être une chaîne de caractères.',
      'string.max': 'La date de naissance ne peut pas dépasser 500 caractères.',
      'any.required': 'La date de naissance est requise.'
    }),
  numero: Joi.string().max(500).required()
    .messages({
      'string.base': 'Le numéro doit être une chaîne de caractères.',
      'string.max': 'Le numéro ne peut pas dépasser 500 caractères.',
      'any.required': 'Le numéro est requis.'
    }),
  email: Joi.string().email().max(500).required()
    .messages({
      'string.base': 'L\'email doit être une chaîne de caractères.',
      'string.email': 'L\'email doit être une adresse email valide.',
      'string.max': 'L\'email ne peut pas dépasser 500 caractères.',
      'any.required': 'L\'email est requis.'
    }),
  adresse: Joi.string().max(500).required()
    .messages({
      'string.base': 'L\'adresse doit être une chaîne de caractères.',
      'string.max': 'L\'adresse ne peut pas dépasser 500 caractères.',
      'any.required': 'L\'adresse est requise.'
    }),
  pseudo: Joi.string().max(500).required()
    .messages({
      'string.base': 'Le pseudo doit être une chaîne de caractères.',
      'string.max': 'Le pseudo ne peut pas dépasser 500 caractères.',
      'any.required': 'Le pseudo est requis.'
    }),
  motDePasse: Joi.string().max(500).required()
    .messages({
      'string.base': 'Le mot de passe doit être une chaîne de caractères.',
      'string.max': 'Le mot de passe ne peut pas dépasser 500 caractères.',
      'any.required': 'Le mot de passe est requis.'
    }),
  estBotaniste: Joi.boolean().default(false)
    .messages({
      'boolean.base': 'EstBotaniste doit être un booléen.',
    })
});

module.exports = utilisateurSchema;
