const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers de conversation
const ajouter = require('../controllers/Conversation/ajouter');
const afficher = require('../controllers/Conversation/afficher');
const recupererPhotoPlante = require('../controllers/Conversation/recupererPhotoPlante');

router.post('/ajouter', authorized, ajouter);
router.get('/afficher', authorized, afficher);
router.get('/recupererPhotoPlante', authorized, recupererPhotoPlante);

// Récupérer les conversations
/**
 * @swagger
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       required:
 *         - idConversation
 *         - idUtilisateur
 *         - idUtilisateur_1
 *         - idGardiennage
 *       properties:
 *         idConversation:
 *           type: integer
 *           description: ID auto-généré de la conversation
 *         idUtilisateur:
 *           type: integer
 *           description: ID de l'utilisateur 1
 *         idUtilisateur_1:
 *           type: integer
 *           description: ID de l'utilisateur 2
 *         idGardiennage:
 *           type: integer
 *           description: ID du gardiennage associé à la conversation
 *       example:
 *         id: 1
 *         idUtilisateur: 101
 *         idUtilisateur_1: 102
 *         idGardiennage: 201
 */

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: API pour gérer les conversations
 */

/**
 * @swagger
 * /api/conversation/afficher:
 *   get:
 *     summary: Récupérer les conversations pour un utilisateur
 *     tags: [Conversations]
 *     parameters:
 *       - in: query
 *         name: idUtilisateur
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des conversations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 conversations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Conversation'
 *       500:
 *         description: Erreur serveur
 */

// Ajouter une conversation
/**
 * @swagger
 * /api/conversation/ajouter:
 *   post:
 *     summary: Ajouter une nouvelle conversation
 *     tags: [Conversations]
 *     parameters:
 *       - in: query
 *         name: idUtilisateur
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur 1
 *       - in: query
 *         name: idUtilisateur_1
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur 2
 *       - in: query
 *         name: idGardiennage
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du gardiennage
 *     responses:
 *       200:
 *         description: Conversation créée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 conversation:
 *                   $ref: '#/components/schemas/Conversation'
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;