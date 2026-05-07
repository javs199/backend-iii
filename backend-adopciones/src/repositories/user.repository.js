const users = require('../data/users.fake');

class UserRepository {
  getAll() {
    return users;
  }
  
  getById(id) {
    return users.find(u => u.id === id);
  }
}

module.exports = new UserRepository();
