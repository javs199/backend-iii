const pets = require('../data/pets.fake');

class PetRepository {
  getAll() {
    return pets;
  }
  
  getById(id) {
    return pets.find(p => p.id === id);
  }

  update(id, petData) {
    const index = pets.findIndex(p => p.id === id);
    if (index !== -1) {
      pets[index] = { ...pets[index], ...petData };
      return pets[index];
    }
    return null;
  }
}

module.exports = new PetRepository();
