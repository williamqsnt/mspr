// src/models/schemas/messageSchema.js

const Joi = require('joi');

const messageSchema = Joi.object({
  dateEnvoi: Joi.string().max(50).required(),
  contenu: Joi.string().required(),
  idUtilisateur: Joi.number().integer().required(),
  idConversation: Joi.number().integer().required()
});

module.exports = messageSchema;
