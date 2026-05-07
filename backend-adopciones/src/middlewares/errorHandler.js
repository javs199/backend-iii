const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(`[Error] ${err.message}`);
  }
  
  if (err.message === 'USER_NOT_FOUND' || err.message === 'PET_NOT_FOUND' || err.message === 'ADOPTION_NOT_FOUND') {
    return res.status(404).json({ status: 'error', error: err.message });
  }

  if (err.message === 'PET_ALREADY_ADOPTED') {
    return res.status(409).json({ status: 'error', error: err.message });
  }

  res.status(500).json({ status: 'error', error: 'Internal Server Error' });
};

module.exports = errorHandler;
