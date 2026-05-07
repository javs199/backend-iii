const users = require('./users.fake');
const pets = require('./pets.fake');
const adoptions = require('./adoptions.fake');
const adoptionRepository = require('../repositories/adoption.repository');

const initialUsers = [
  { id: 'u1', name: 'John Doe', email: 'john@example.com' },
  { id: 'u2', name: 'Jane Doe', email: 'jane@example.com' }
];

const initialPets = [
  { id: 'p1', name: 'Firulais', species: 'Dog', adopted: false },
  { id: 'p2', name: 'Mishi', species: 'Cat', adopted: false }
];

const resetFakeData = () => {
  // Restaurar usuarios
  users.length = 0;
  users.push(...initialUsers.map(u => ({ ...u })));

  // Restaurar mascotas
  pets.length = 0;
  pets.push(...initialPets.map(p => ({ ...p })));

  // Restaurar adopciones
  adoptions.length = 0;
  
  // Reiniciar contador de IDs de adopciones para evitar IDs disparatados en tests
  if (adoptionRepository && typeof adoptionRepository.resetCounter === 'function') {
    adoptionRepository.resetCounter();
  }
};

module.exports = resetFakeData;
