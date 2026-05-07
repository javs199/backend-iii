const adoptionRepository = require('../repositories/adoption.repository');
const userRepository = require('../repositories/user.repository');
const petRepository = require('../repositories/pet.repository');

class AdoptionService {
  getAllAdoptions() {
    return adoptionRepository.getAll();
  }
  
  getAdoptionById(id) {
    const adoption = adoptionRepository.getById(id);
    if (!adoption) throw new Error('ADOPTION_NOT_FOUND');
    return adoption;
  }

  createAdoption(uid, pid) {
    const user = userRepository.getById(uid);
    if (!user) throw new Error('USER_NOT_FOUND');

    const pet = petRepository.getById(pid);
    if (!pet) throw new Error('PET_NOT_FOUND');

    if (pet.adopted) throw new Error('PET_ALREADY_ADOPTED');

    const adoption = adoptionRepository.create({ userId: uid, petId: pid });
    petRepository.update(pid, { adopted: true });

    return adoption;
  }

  deleteAdoption(aid) {
    const adoption = adoptionRepository.getById(aid);
    if (!adoption) throw new Error('ADOPTION_NOT_FOUND');

    petRepository.update(adoption.petId, { adopted: false });
    return adoptionRepository.delete(aid);
  }
}

module.exports = new AdoptionService();
