const Joi = require("joi");

const editUserValidationSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(15).required(),
  firstName: Joi.string().alphanum().min(3).max(15).required(),
  lastName: Joi.string().alphanum().min(3).max(15).required(),
  birthday: Joi.number().integer().min(1900).max(2013).required(),
});

async function validateUserMiddleware(req, res, next) {
  console.log(req.body);
  const { userName, firstName, lastName, birthday } = req.body;
  console.log(userName);
  /* console.log(req.body); */

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
        data: req.body,
      });
      console.log(`edit user middleware: ${error}`);
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
