const Joi = require('joi');

const gardiennageSchema = Joi.object({
  dateDebut: Joi.date().iso().required()
    .messages({
      'date.base': 'La date de début doit être une date valide.',
      'date.iso': 'La date de début doit être au format ISO.'
    }),
  dateFin: Joi.date().iso().required()
    .messages({
      'date.base': 'La date de fin doit être une date valide.',
      'date.iso': 'La date de fin doit être au format ISO.'
    })
    .greater(Joi.ref('dateDebut')).messages({
      'date.greater': 'La date de fin doit être postérieure à la date de début.'
    }),
  idUtilisateur: Joi.number().integer().optional().allow(null)
    .messages({
      'number.base': 'L\'idUtilisateur doit être un nombre entier.',
      'number.integer': 'L\'idUtilisateur doit être un entier.'
    }),
  idPlante: Joi.number().integer().required()
    .messages({
      'number.base': 'L\'idPlante doit être un nombre entier.',
      'number.integer': 'L\'idPlante doit être un entier.'
    })
});

module.exports = gardiennageSchema;
