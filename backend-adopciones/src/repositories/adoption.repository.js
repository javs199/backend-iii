const adoptions = require('../data/adoptions.fake');

class AdoptionRepository {
  constructor() {
    this.counter = 0;
  }

  resetCounter() {
    this.counter = 0;
  }
  getAll() {
    return adoptions;
  }
  
  getById(id) {
    return adoptions.find(a => a.id === id);
  }

  create(adoptionData) {
    this.counter++;
    const newAdoption = {
      id: `a${this.counter}`,
      ...adoptionData,
      createdAt: new Date()
    };
    adoptions.push(newAdoption);
    return newAdoption;
  }

  delete(id) {
    const index = adoptions.findIndex(a => a.id === id);
    if (index !== -1) {
      const deleted = adoptions.splice(index, 1);
      return deleted[0];
    }
    return null;
  }
}

module.exports = new AdoptionRepository();
