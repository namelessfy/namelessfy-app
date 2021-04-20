const { Router } = require("express");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const { authMiddleware, validateUserMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.post("/sign-up", authMiddleware, userController.signUp);
userRouter.post("/sign-out", authMiddleware, userController.signOut);
userRouter.patch(
  "/user/edit",
  authMiddleware,
  upload.single("porfileImage"),
  validateUserMiddleware,
  userController.edit,
);
userRouter.delete("/user/delete", authMiddleware, userController.delete);

module.exports = {
  userRouter,
};
