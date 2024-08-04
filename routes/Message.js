const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers de message
const ajouter = require('../controllers/Message/ajouter');
const recupererAll = require('../controllers/Message/recupererAll');

router.post('/ajouter', ajouter);
router.get('/recupererAll', recupererAll);

// Ajouter un message
/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - idMessage
 *         - contenu
 *         - idUtilisateur
 *         - idConversation
 *       properties:
 *         idMessage:
 *           type: integer
 *           description: ID auto-généré du message
 *         dateEnvoi:
 *           type: string
 *           format: date-time
 *           description: Date et heure d'envoi du message
 *         contenu:
 *           type: string
 *           description: Contenu du message
 *         idUtilisateur:
 *           type: integer
 *           description: ID de l'utilisateur qui a envoyé le message
 *         idConversation:
 *           type: integer
 *           description: ID de la conversation associée au message
 *       example:
 *         id: 1
 *         dateEnvoi: "2023-08-01T14:30:00Z"
 *         contenu: "Bonjour, comment ça va?"
 *         idUtilisateur: 101
 *         idConversation: 201
 */

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API pour gérer les messages
 */

/**
 * @swagger
 * /api/message/ajouter:
 *   post:
 *     summary: Ajouter un nouveau message
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: contenu
 *         schema:
 *           type: string
 *         required: true
 *         description: Contenu du message
 *       - in: query
 *         name: idUtilisateur
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur qui envoie le message
 *       - in: query
 *         name: idConversation
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la conversation associée au message
 *     responses:
 *       200:
 *         description: Message créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successMessage:
 *                   type: string
 *                 createdMessage:
 *                   $ref: '#/components/schemas/Message'
 *       500:
 *         description: Erreur serveur
 */

// Récupérer tous les messages d'une conversation
/**
 * @swagger
 * /api/message/recupererAll:
 *   get:
 *     summary: Récupérer tous les messages d'une conversation
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: idConversation
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la conversation
 *     responses:
 *       200:
 *         description: Liste des messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;