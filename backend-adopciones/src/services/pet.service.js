const petRepository = require('../repositories/pet.repository');

class PetService {
  getAllPets() {
    return petRepository.getAll();
  }
}

module.exports = new PetService();
