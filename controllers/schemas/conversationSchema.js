// src/models/schemas/conversationSchema.js

const Joi = require('joi');

const conversationSchema = Joi.object({
  idUtilisateur: Joi.number().integer().required(),
  idUtilisateur_1: Joi.number().integer().required(),
  idGardiennage: Joi.number().integer().required()
});

module.exports = conversationSchema;
