const userRepository = require('../repositories/user.repository');

class UserService {
  getAllUsers() {
    return userRepository.getAll();
  }
}

module.exports = new UserService();
