const Joi = require('joi');

const planteSchema = Joi.object({
  espece: Joi.string().max(50).required()
    .messages({
      'string.base': 'L\'espèce doit être une chaîne de caractères.',
      'string.max': 'L\'espèce ne peut pas dépasser 50 caractères.',
      'any.required': 'L\'espèce est requise.'
    }),
  description: Joi.string().min(1).max(1000).required()
    .messages({
      'string.base': 'La description doit être une chaîne de caractères.',
      'string.min': 'La description doit contenir au moins 1 caractère.',
      'string.max': 'La description ne peut pas dépasser 1000 caractères.',
      'any.required': 'La description est requise.'
    }),
  nom: Joi.string().max(50).required()
    .messages({
      'string.base': 'Le nom doit être une chaîne de caractères.',
      'string.max': 'Le nom ne peut pas dépasser 50 caractères.',
      'any.required': 'Le nom est requis.'
    }),
  adresse: Joi.string().max(50).required()
    .messages({
      'string.base': 'L\'adresse doit être une chaîne de caractères.',
      'string.max': 'L\'adresse ne peut pas dépasser 50 caractères.',
      'any.required': 'L\'adresse est requise.'
    }),
  photoUrl: Joi.string().uri().max(255).optional()
    .messages({
      'string.base': 'L\'URL de la photo doit être une chaîne de caractères.',
      'string.uri': 'L\'URL de la photo doit être une URL valide.',
      'string.max': 'L\'URL de la photo ne peut pas dépasser 255 caractères.'
    }),
  idUtilisateur: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'L\'idUtilisateur doit être un nombre entier.',
      'number.integer': 'L\'idUtilisateur doit être un entier.',
      'number.positive': 'L\'idUtilisateur doit être un nombre entier positif.',
      'any.required': 'L\'idUtilisateur est requis.'
    })
});

module.exports = planteSchema;
