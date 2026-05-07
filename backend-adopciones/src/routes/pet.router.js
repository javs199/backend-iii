const { Router } = require('express');
const petController = require('../controllers/pet.controller');

const router = Router();

router.get('/', petController.getAll);

module.exports = router;
