const Joi = require('joi');

const conseilSchema = Joi.object({
  description: Joi.string().min(1).required()
    .messages({
      'string.base': 'La description doit être une chaîne de caractères.',
      'string.empty': 'La description ne peut pas être vide.',
      'any.required': 'La description est requise.'
    }),
  idPlante: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'L\'idPlante doit être un nombre entier.',
      'number.integer': 'L\'idPlante doit être un entier.',
      'number.positive': 'L\'idPlante doit être un nombre entier positif.',
      'any.required': 'L\'idPlante est requis.'
    }),
  idUtilisateur: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'L\'idUtilisateur doit être un nombre entier.',
      'number.integer': 'L\'idUtilisateur doit être un entier.',
      'number.positive': 'L\'idUtilisateur doit être un nombre entier positif.',
      'any.required': 'L\'idUtilisateur est requis.'
    })
});

module.exports = conseilSchema;
