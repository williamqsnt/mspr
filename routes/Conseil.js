const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers de conseil
const afficher = require('../controllers/Conseil/afficher');
const ajouter = require('../controllers/Conseil/ajouter');

router.get('/afficher', afficher);
router.post('/ajouter', ajouter);

// Ajouter un conseil
/**
 * @swagger
 * /api/conseil/ajouter:
 *   post:
 *     summary: Ajouter un conseil
 *     tags: [Conseils]
 *     parameters:
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         required: true
 *         description: Description du conseil
 *       - in: query
 *         name: idPlante
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la plante
 *       - in: query
 *         name: idUtilisateur
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Conseil ajouté
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 conseil:
 *                   $ref: '#/components/schemas/Conseil'
 *       500:
 *         description: Erreur serveur
 */


// Récupérer les conseils pour une plante
/**
 * @swagger
 * components:
 *   schemas:
 *     Conseil:
 *       type: object
 *       required:
 *         - idConseil
 *         - description
 *         - idPlante
 *         - idUtilisateur
 *       properties:
 *         idConseil:
 *           type: integer
 *           description: ID auto-généré du conseil
 *         description:
 *           type: string
 *           description: Description du conseil
 *         idPlante:
 *           type: integer
 *           description: ID de la plante associée au conseil
 *         idUtilisateur:
 *           type: integer
 *           description: ID de l'utilisateur ayant donné le conseil
 *       example:
 *         id: 1
 *         description: "Arroser tous les deux jours"
 *         idPlante: 101
 *         idUtilisateur: 201
 */

/**
 * @swagger
 * tags:
 *   name: Conseils
 *   description: API pour gérer les conseils
 */

/**
 * @swagger
 * /api/conseil/afficher:
 *   get:
 *     summary: Récupérer les conseils pour une plante
 *     tags: [Conseils]
 *     parameters:
 *       - in: query
 *         name: idPlante
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la plante
 *     responses:
 *       200:
 *         description: Liste des conseils
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 conseils:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Conseil'
 *       500:
 *         description: Erreur serveur
 */

router.get('/', async (req, res) => {
    // votre logique ici
    res.status(200).json({ message: 'Liste des conseils' });
  });
  

module.exports = router;