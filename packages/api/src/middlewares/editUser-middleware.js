const Joi = require("joi");

const editUserValidationSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(15).required(),
  firstName: Joi.string().alphanum().min(3).max(15).required(),
  lastName: Joi.string().alphanum().min(3).max(15).required(),
  birthday: Joi.string().required(),
});

async function validateUserMiddleware(req, res, next) {
  const { userName, firstName, lastName, birthday } = req.body;

  try {
    const { error } = editUserValidationSchema.validate({
      userName,
      firstName,
      lastName,
      birthday,
    });

    if (error) {
      res.status(401).send({
        error: error,
        data: null,
      });
    } else {
      next();
    }
  } catch (error) {
    req.status(400).send(error.message);
  }
}

module.exports = {
  validateUserMiddleware: validateUserMiddleware,
};
