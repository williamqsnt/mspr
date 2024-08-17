const Joi = require('joi');

const conversationSchema = Joi.object({
  idUtilisateur: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'L\'idUtilisateur doit être un nombre entier.',
      'number.integer': 'L\'idUtilisateur doit être un entier.',
      'number.positive': 'L\'idUtilisateur doit être un nombre entier positif.',
      'any.required': 'L\'idUtilisateur est requis.'
    }),
  idUtilisateur_1: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'L\'idUtilisateur_1 doit être un nombre entier.',
      'number.integer': 'L\'idUtilisateur_1 doit être un entier.',
      'number.positive': 'L\'idUtilisateur_1 doit être un nombre entier positif.',
      'any.required': 'L\'idUtilisateur_1 est requis.'
    }),
  idGardiennage: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'L\'idGardiennage doit être un nombre entier.',
      'number.integer': 'L\'idGardiennage doit être un entier.',
      'number.positive': 'L\'idGardiennage doit être un nombre entier positif.',
      'any.required': 'L\'idGardiennage est requis.'
    })
});

module.exports = conversationSchema;
