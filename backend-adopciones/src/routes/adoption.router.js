const { Router } = require('express');
const adoptionController = require('../controllers/adoption.controller');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Adoption:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         petId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones.
 */
router.get('/', adoptionController.getAll);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtener una adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la adopción.
 *       404:
 *         description: Adopción no encontrada.
 */
router.get('/:aid', adoptionController.getById);

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota
 *     responses:
 *       201:
 *         description: Adopción creada exitosamente.
 *       404:
 *         description: Usuario o mascota no encontrados.
 *       409:
 *         description: La mascota ya se encuentra adoptada.
 */
router.post('/:uid/:pid', adoptionController.create);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   delete:
 *     summary: Eliminar o cancelar una adopción
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopción eliminada con éxito.
 *       404:
 *         description: Adopción no encontrada.
 */
router.delete('/:aid', adoptionController.delete);

module.exports = router;
