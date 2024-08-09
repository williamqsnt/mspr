// src/models/schemas/conseilSchema.js

const Joi = require('joi');

const conseilSchema = Joi.object({
  description: Joi.string().required(),
  idPlante: Joi.number().integer().required(),
  idUtilisateur: Joi.number().integer().required()
});

module.exports = conseilSchema;
