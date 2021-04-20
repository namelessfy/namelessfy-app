const { auth, logger } = require("../services");

async function authMiddleware(req, res, next) {
  try {
    const bearerToken = await auth.getAuthToken(req.headers);
    const userClaims = await auth.verifyAuthToken(bearerToken);

    auth.login(req, userClaims);
    /* console.log(bearerToken); */

    next();
  } catch (error) {
    logger.debug(error);

    res.status(401).send({
      data: null,
      error: "Unauthorized",
    });
    console.log(`edit user middleware: ${error}`);
  }
}

module.exports = {
  authMiddleware,
};
