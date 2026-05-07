const userService = require('../services/user.service');

class UserController {
  getAll = (req, res, next) => {
    try {
      const users = userService.getAllUsers();
      res.json({ status: 'success', payload: users });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();
