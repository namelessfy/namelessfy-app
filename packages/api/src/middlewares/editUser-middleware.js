const Joi = require("joi");

const editUserValidationSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(15).required(),
  lastName: Joi.string().alphanum().min(3).max(15).required(),
});

async function validationUserMiddleware(req, res, next) {
  const { firstName, lastName } = req.body;

  try {
    const { error } = editUserValidationSchema.validate({
      firstName,
      lastName,
    });

    if (error) {
      res.status(401).send({
        error: error,
        data: req.body,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validationUserMiddleware: validationUserMiddleware,
};
