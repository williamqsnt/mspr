const Joi = require('joi');

const messageSchema = Joi.object({
  dateEnvoi: Joi.date().iso().required()
    .messages({
      'date.base': 'La date d\'envoi doit être une date valide.',
      'date.iso': 'La date d\'envoi doit être au format ISO.',
      'any.required': 'La date d\'envoi est requise.'
    }),
  contenu: Joi.string().min(1).max(1000).required()
    .messages({
      'string.base': 'Le contenu doit être une chaîne de caractères.',
      'string.empty': 'Le contenu ne peut pas être vide.',
      'string.max': 'Le contenu ne peut pas dépasser 1000 caractères.',
      'any.required': 'Le contenu est requis.'
    }),
  idUtilisateur: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'L\'idUtilisateur doit être un nombre entier.',
      'number.integer': 'L\'idUtilisateur doit être un entier.',
      'number.positive': 'L\'idUtilisateur doit être un nombre entier positif.',
      'any.required': 'L\'idUtilisateur est requis.'
    }),
  idConversation: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'L\'idConversation doit être un nombre entier.',
      'number.integer': 'L\'idConversation doit être un entier.',
      'number.positive': 'L\'idConversation doit être un nombre entier positif.',
      'any.required': 'L\'idConversation est requis.'
    })
});

module.exports = messageSchema;
