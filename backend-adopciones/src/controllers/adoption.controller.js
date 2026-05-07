const adoptionService = require('../services/adoption.service');

class AdoptionController {
  getAll = (req, res, next) => {
    try {
      const adoptions = adoptionService.getAllAdoptions();
      res.json({ status: 'success', payload: adoptions });
    } catch (error) {
      next(error);
    }
  };

  getById = (req, res, next) => {
    try {
      const { aid } = req.params;
      const adoption = adoptionService.getAdoptionById(aid);
      res.json({ status: 'success', payload: adoption });
    } catch (error) {
      next(error);
    }
  };

  create = (req, res, next) => {
    try {
      const { uid, pid } = req.params;
      const newAdoption = adoptionService.createAdoption(uid, pid);
      res.status(201).json({ status: 'success', payload: newAdoption });
    } catch (error) {
      next(error);
    }
  };

  delete = (req, res, next) => {
    try {
      const { aid } = req.params;
      const deletedAdoption = adoptionService.deleteAdoption(aid);
      res.json({ status: 'success', payload: deletedAdoption });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AdoptionController();
