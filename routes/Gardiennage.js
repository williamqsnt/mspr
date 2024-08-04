const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers de gardiennage
const afficherGardes = require('../controllers/Gardiennage/afficherGardes');
const ajouter = require('../controllers/Gardiennage/ajouter');
const ajouterGardien = require('../controllers/Gardiennage/ajouterGardien');

router.get('/afficherGardes', afficherGardes);
router.post('/ajouter', ajouter);
router.put('/ajouterGardien', ajouterGardien);

// Récupérer les gardiennages
/**
 * @swagger
 * components:
 *   schemas:
 *     Gardiennage:
 *       type: object
 *       required:
 *         - idGardiennage
 *         - dateDebut
 *         - dateFin
 *         - idPlante
 *       properties:
 *         idGardiennage:
 *           type: integer
 *           description: ID auto-généré du gardiennage
 *         dateDebut:
 *           type: string
 *           format: date
 *           description: Date de début du gardiennage
 *         dateFin:
 *           type: string
 *           format: date
 *           description: Date de fin du gardiennage
 *         idPlante:
 *           type: integer
 *           description: ID de la plante associée au gardiennage
 *         idUtilisateur:
 *           type: integer
 *           description: ID de l'utilisateur gardien
 *       example:
 *         id: 1
 *         dateDebut: "2023-08-01"
 *         dateFin: "2023-08-10"
 *         idPlante: 101
 *         idUtilisateur: 201
 */

/**
 * @swagger
 * tags:
 *   name: Gardiennages
 *   description: API pour gérer les gardiennages
 */

/**
 * @swagger
 * /api/gardiennage/afficherGardes:
 *   get:
 *     summary: Récupérer les gardiennages pour un utilisateur
 *     tags: [Gardiennages]
 *     parameters:
 *       - in: query
 *         name: idUtilisateur
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des gardiennages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 gardiennages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Gardiennage'
 *       500:
 *         description: Erreur serveur
 */

// Ajouter un gardiennage
/**
 * @swagger
 * /api/gardiennage/ajouter:
 *   post:
 *     summary: Ajouter un nouveau gardiennage
 *     tags: [Gardiennages]
 *     parameters:
 *       - in: query
 *         name: dateDebut
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Date de début du gardiennage
 *       - in: query
 *         name: dateFin
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Date de fin du gardiennage
 *       - in: query
 *         name: idPlante
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la plante
 *     responses:
 *       200:
 *         description: Gardiennage créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 gardiennage:
 *                   $ref: '#/components/schemas/Gardiennage'
 *       500:
 *         description: Erreur serveur
 */

// Ajouter un gardien à un gardiennage
/**
 * @swagger
 * /api/gardiennage/ajouterGardien:
 *   post:
 *     summary: Ajouter un gardien à un gardiennage
 *     tags: [Gardiennages]
 *     parameters:
 *       - in: query
 *         name: idGardiennage
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du gardiennage
 *       - in: query
 *         name: idUtilisateur
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur gardien
 *     responses:
 *       200:
 *         description: Gardien ajouté au gardiennage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 gardiennage:
 *                   $ref: '#/components/schemas/Gardiennage'
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;