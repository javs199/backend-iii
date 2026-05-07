const petService = require('../services/pet.service');

class PetController {
  getAll = (req, res, next) => {
    try {
      const pets = petService.getAllPets();
      res.json({ status: 'success', payload: pets });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new PetController();
