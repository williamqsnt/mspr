const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers de plante
const afficher = require('../controllers/Plante/afficher');
const afficherAll = require('../controllers/Plante/afficherAll');
const afficherAllByUtilisateur = require('../controllers/Plante/afficherAllByUtilisateur');
const ajouter = require('../controllers/Plante/ajouter');
const recupererLocalisation = require('../controllers/Plante/recupererLocalisation');
const recupererInfos = require('../controllers/Plante/recupererInfos');
const modifier = require('../controllers/Plante/modifier');
const supprimer = require('../controllers/Plante/supprimer');
const ajouterPhoto = require('../controllers/Plante/ajouterPhoto');

router.get('/afficher', afficher);
router.get('/afficherAll', afficherAll);
router.get('/afficherAllByUtilisateur', afficherAllByUtilisateur);
router.post('/ajouterPhoto', ajouterPhoto);
router.post('/ajouter', ajouter);
router.get('/recupererLocalisation', recupererLocalisation);
router.get('/recupererInfos', recupererInfos);
router.put('/modifier', modifier);
router.delete('/supprimer', supprimer);

/**
* @swagger
* components:
*   schemas:
*     Plante:
*       type: object
*       required:
*         - idPlante
*         - espece
*         - description
*         - nom
*         - adresse
*         - idUtilisateur
*       properties:
*         idPlante:
*           type: integer
*           description: ID unique de la plante, auto-généré
*         espece:
*           type: string
*           description: Espèce de la plante
*           maxLength: 50
*         description:
*           type: string
*           description: Description de la plante
*         nom:
*           type: string
*           description: Nom de la plante
*           maxLength: 50
*         adresse:
*           type: string
*           description: Adresse où la plante est située
*           maxLength: 50
*         photoUrl:
*           type: string
*           format: uri
*           description: URL de la photo de la plante (facultatif)
*           maxLength: 255
*         idUtilisateur:
*           type: integer
*           description: ID de l'utilisateur associé à la plante
*       example:
*         idPlante: 1
*         espece: "Cactus"
*         description: "Une plante succulente qui stocke l'eau dans ses tiges."
*         nom: "Cactus de Noël"
*         adresse: "123 rue des Plantes"
*         photoUrl: "http://example.com/photo-cactus.jpg"
*         idUtilisateur: 101
*/

/**
 * @swagger
 * /api/plante/afficher:
 *   get:
 *     summary: Afficher une plante
 *     tags: [Plantes]
 *     responses:
 *       200:
 *         description: Plante affichée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plante:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nom:
 *                       type: string
 *                     adresse:
 *                       type: string
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/plante/afficherAll:
 *   get:
 *     summary: Afficher toutes les plantes
 *     tags: [Plantes]
 *     responses:
 *       200:
 *         description: Liste de toutes les plantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plantes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nom:
 *                         type: string
 *                       adresse:
 *                         type: string
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/plante/afficherAllByUtilisateur:
 *   get:
 *     summary: Afficher les plantes d'un utilisateur spécifique
 *     tags: [Plantes]
 *     parameters:
 *       - in: query
 *         name: idUtilisateur
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur pour filtrer les plantes
 *     responses:
 *       200:
 *         description: Liste des plantes pour l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plantes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nom:
 *                         type: string
 *                       adresse:
 *                         type: string
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/plante/ajouter:
 *   post:
 *     summary: Ajouter une plante
 *     tags: [Plantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               adresse:
 *                 type: string
 *     responses:
 *       201:
 *         description: Plante ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/plante/ajouterPhoto:
 *   post:
 *     summary: Ajouter une photo à une plante
 *     tags: [Plantes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               idPlante:
 *                 type: integer
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Photo ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/plante/recupererLocalisation:
 *   get:
 *     summary: Récupérer les adresses des plantes sans gardiennage
 *     tags: [Plantes]
 *     responses:
 *       200:
 *         description: Liste des adresses des plantes sans gardiennage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 adresses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idPlante:
 *                         type: integer
 *                       adresse:
 *                         type: string
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/plante/recupererInfos:
 *   get:
 *     summary: Récupérer les informations des plantes sans gardiennage
 *     tags: [Plantes]
 *     responses:
 *       200:
 *         description: Liste des plantes sans gardiennage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plantes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nom:
 *                         type: string
 *                       adresse:
 *                         type: string
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/plante/modifier:
 *   put:
 *     summary: Modifier une plante
 *     tags: [Plantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nom:
 *                 type: string
 *               adresse:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plante modifiée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/plante/supprimer:
 *   delete:
 *     summary: Supprimer une plante
 *     tags: [Plantes]
 *     parameters:
 *       - in: query
 *         name: idPlante
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la plante à supprimer
 *     responses:
 *       200:
 *         description: Plante supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 */




module.exports = router;