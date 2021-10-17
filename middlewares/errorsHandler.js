const { errorMessages } = require('../utils/constants');

const errorsHandler = (err, req, res, next) => {
  const { errCode = 500, message = errorMessages.serverErrorMessage } = err;
  console.log(err.message);
  res.status(errCode).send({ message });
  next();
};

module.exports = { errorsHandler };
