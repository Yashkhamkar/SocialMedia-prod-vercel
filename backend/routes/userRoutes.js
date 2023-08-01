const express = require("express");
const {
  register,
  login,
  verifyUser,
  followunfollowUser,
  logout,
  updatePassword,
  updateProfile,
  getallUsers,
  deleteProfile,
  getProfile,
  getOtherProfile,
  forgotPassword,
  resetpassword,
  enable2fa,
  searchUsers,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");
const { route } = require("./postRoutes");
const router = express.Router();

router.route("/forgotpassword").post(forgotPassword);
router.route("/search").get(protect, searchUsers);
router.route("/myprofile").get(protect, getProfile);
router.route("/").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/updatepass").post(protect, updatePassword);
router.route("/updateprofile").post(protect, updateProfile);
router.route("/verify/:id").post(verifyUser);
router.route("/getall").get(protect, getallUsers);
router
  .route("/:id")
  .put(protect, followunfollowUser)
  .get(protect, getOtherProfile);
router.route("/deleteprofile").delete(protect, deleteProfile);
router.route("/reset/:id").post(resetpassword);
router.route("/enable2fa/:id").put(enable2fa);
module.exports = router;
