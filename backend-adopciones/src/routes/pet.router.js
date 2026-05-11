const { Router } = require('express');
const petController = require('../controllers/pet.controller');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         species:
 *           type: string
 *         adopted:
 *           type: boolean
 */

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtener todas las mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de mascotas.
 */
router.get('/', petController.getAll);

module.exports = router;
