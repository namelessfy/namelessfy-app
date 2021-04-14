const { UserRepo } = require("../repositories");

async function signUp(req, res, next) {
  const { uid, email } = req.user;

  try {
    const response = await UserRepo.findOne({ email: email });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send({
        data: "OK",
        error: null,
      });
    }

    await UserRepo.create({
      _id: uid,
      email: email,
    });

    res.status(201).send({
      data: "OK",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function signOut(req, res) {
  req.signOut();

  res.status(200).send({
    data: "OK",
    error: null,
  });
}

async function edit(req, res) {
  const { email } = req.user;
  const updateFields = Object.keys(req.body);
  const allowedUpdates = ["firstName", "lastName", "email"];
  const isValidUpdate = updateFields.every((property) =>
    allowedUpdates.includes(property),
  );

  if (!isValidUpdate) {
    res.status(400).send({
      error: "Invalid update request",
    });
  }

  try {
    const response = await UserRepo.findOneAndUpdate(
      { email: email },
      req.body,
    );

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send(response.data);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  signUp: signUp,
  signOut: signOut,
  edit: edit,
};
