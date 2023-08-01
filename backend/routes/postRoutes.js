const express = require("express");
const {
  createPost,
  deletePost,
  likeunlike,
  getPostsOfFollowing,
  addComment,
  getallPosts,
  editPost,
} = require("../controllers/postController");
const protect = require("../middlewares/authMiddleware");
const { forgotPassword } = require("../controllers/userController");

const router = express.Router();

router.route("/").post(protect, createPost);
router.route("/getposts").get(protect, getallPosts);
router.route("/editpost/:id").put(protect, editPost);
router
  .route("/:id")
  .put(protect, likeunlike)
  .delete(protect, deletePost)
  .post(protect, addComment);
router.route("/posts").get(protect, getPostsOfFollowing);
module.exports = router;
