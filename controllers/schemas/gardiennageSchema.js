// src/models/schemas/gardiennageSchema.js

const Joi = require('joi');

const gardiennageSchema = Joi.object({
  dateDebut: Joi.date().iso().required(),
  dateFin: Joi.date().iso().required(),
  idUtilisateur: Joi.number().integer().optional().allow(null),
  idPlante: Joi.number().integer().required()
});

module.exports = gardiennageSchema;
