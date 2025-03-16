const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers.js");
const authMiddlewares = require("../middlewares/auth.js");
const multer = require("multer");
const { storage, cloudinary } = require("../config/cloudinary.config.js");
const upload = multer({ storage });

router.post("/register", upload.single("avatar"), userControllers.registerUser);

router.post("/login", userControllers.loginUser);

router.post("/login/google", userControllers.googleLogin);

router.get("/logout", userControllers.logoutUser);

router.post("/password/forgot", userControllers.forgotPassword);

router.put("/password/reset/:token", userControllers.resetPassword);

router.get(
  "/me",
  authMiddlewares.isAuthenticatedUser,
  userControllers.getUserDetails
);

router.put(
  "/password/update",
  authMiddlewares.isAuthenticatedUser,
  userControllers.updatePassword
);

router.put(
  "/me/update",
  authMiddlewares.isAuthenticatedUser,
  upload.single("avatar"),
  userControllers.updateProfile
);

router.get(
  "/admin/users",
  authMiddlewares.isAuthenticatedUser,
  authMiddlewares.isAdmin,
  userControllers.getAllUser
);

router.get(
  "/admin/user/:id",
  authMiddlewares.isAuthenticatedUser,
  authMiddlewares.isAdmin,
  userControllers.getSingleUser
);

router.put(
  "/admin/user/:id",
  authMiddlewares.isAuthenticatedUser,
  authMiddlewares.isAdmin,
  userControllers.updateUserRole
);

router.delete(
  "/admin/user/:id",
  authMiddlewares.isAuthenticatedUser,
  authMiddlewares.isAdmin,
  userControllers.deleteUser
);

module.exports = router;
