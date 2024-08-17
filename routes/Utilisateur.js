const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers d'utilisateur
const ajouter = require('../controllers/Utilisateur/ajouter');
const recupererId = require('../controllers/Utilisateur/recupererId');
const recuperPseudo = require('../controllers/Utilisateur/recupererPseudo');
const supprimer = require('../controllers/Utilisateur/supprimer');
const verifier = require('../controllers/Utilisateur/verifier');
const estBotaniste = require('../controllers/Utilisateur/estBotaniste');
const infos = require('../controllers/Utilisateur/infos');

router.post('/ajouter', ajouter);
router.get('/recupererId', authorized, recupererId);
router.get('/recupererPseudo', authorized, recuperPseudo);
router.get('/estBotaniste', authorized, estBotaniste);
router.delete('/supprimer', authorized, supprimer);
router.post('/verifier', verifier);
router.get('/infos', authorized, infos);

/**
* @swagger
*components:
*  schemas:
*    Utilisateur:
*      type: object
*      required:
*        - idUtilisateur
*        - nom
*        - prenom
*        - dateNaissance
*        - numero
*        - email
*        - adresse
*        - pseudo
*        - motDePasse
*        - estBotaniste
*      properties:
*        idUtilisateur:
*          type: integer
*          description: ID unique de l'utilisateur, auto-généré
*        nom:
*          type: string
*          description: Nom de l'utilisateur
*          maxLength: 500
*        prenom:
*          type: string
*          description: Prénom de l'utilisateur
*          maxLength: 500
*        dateNaissance:
*          type: string
*          format: date
*          description: Date de naissance de l'utilisateur
*        numero:
*          type: string
*          description: Numéro de téléphone de l'utilisateur
*          maxLength: 500
*        email:
*          type: string
*          format: email
*          description: Adresse email de l'utilisateur
*          maxLength: 500
*        adresse:
*          type: string
*          description: Adresse physique de l'utilisateur
*          maxLength: 500
*        pseudo:
*          type: string
*          description: Pseudo unique de l'utilisateur
*          maxLength: 500
*        motDePasse:
*          type: string
*          description: Mot de passe de l'utilisateur
*          maxLength: 500
*        estBotaniste:
*          type: boolean
*          description: Indique si l'utilisateur est un botaniste
*      example:
*        idUtilisateur: 1
*        nom: "Doe"
*        prenom: "John"
*        dateNaissance: "1985-06-15"
*        numero: "+1234567890"
*        email: "john.doeexample.com"
*        adresse: "456 rue de la Botanique"
*        pseudo: "johndoe"
*        motDePasse: "password123"
*        estBotaniste: true
*/

/**
 * @swagger
 * /api/utilisateur/ajouter:
 *   post:
 *     summary: Ajouter un nouvel utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Utilisateur'
 *     responses:
 *       201:
 *         description: Utilisateur ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Utilisateur'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/utilisateur/recupererId:
 *   get:
 *     summary: Récupérer l'ID d'un utilisateur par son pseudo
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: query
 *         name: pseudo
 *         schema:
 *           type: string
 *         required: true
 *         description: Pseudo de l'utilisateur dont on veut récupérer l'ID
 *     responses:
 *       200:
 *         description: ID de l'utilisateur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idUtilisateur:
 *                   type: integer
 *                   description: ID unique de l'utilisateur
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/utilisateur/recupererPseudo:
 *   get:
 *     summary: Récupérer le pseudo d'un utilisateur par son ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: query
 *         name: idUtilisateur
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur dont on veut récupérer le pseudo
 *     responses:
 *       200:
 *         description: Pseudo de l'utilisateur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pseudo:
 *                   type: string
 *                   description: Pseudo de l'utilisateur
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */


/**
 * @swagger
 * /api/utilisateur/estBotaniste:
 *   get:
 *     summary: Vérifier si un utilisateur est un botaniste
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: query
 *         name: idUtilisateur
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur à vérifier
 *     responses:
 *       200:
 *         description: Retourne un booléen indiquant si l'utilisateur est botaniste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estBotaniste:
 *                   type: boolean
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/utilisateur/supprimer:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: query
 *         name: idUtilisateur
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/utilisateur/verifier:
 *   post:
 *     summary: Vérifier les informations de l'utilisateur (authentification)
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pseudo:
 *                 type: string
 *                 description: Pseudo de l'utilisateur
 *               motDePasse:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *             required:
 *               - pseudo
 *               - motDePasse
 *     responses:
 *       200:
 *         description: Utilisateur authentifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token d'authentification
 *       401:
 *         description: Authentification échouée (pseudo ou mot de passe incorrect)
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/utilisateur/infos:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     tags: [Utilisateurs]
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Utilisateur'
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;