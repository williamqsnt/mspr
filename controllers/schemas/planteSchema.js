// src/models/schemas/planteSchema.js

const Joi = require('joi');

const planteSchema = Joi.object({
  espece: Joi.string().max(50).required(),
  description: Joi.string().required(),
  nom: Joi.string().max(50).required(),
  adresse: Joi.string().max(50).required(),
  photoUrl: Joi.string().uri().max(255).optional(),
  idUtilisateur: Joi.number().integer().required()
});

module.exports = planteSchema;
