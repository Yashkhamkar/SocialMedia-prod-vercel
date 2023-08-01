const mongoose = require("mongoose");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const createPost = async (req, res) => {
  const newPost = await Post.create({ ...req.body, owner: req.user._id });
  const user = await User.findById(req.user._id);
  user.posts.push(newPost._id);
  await user.save();
  const other = newPost._doc;
  res.status(201).json({ other });
};
const likeunlike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const liked = post.likes.some((like) => like.equals(req.user._id));

    if (liked) {
      post.likes.pull(req.user._id);
      await post.save();
      const totalLikes = post.likes.length;
      console.log(totalLikes);
      return res.status(200).json({ totalLikes });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      const totalLikes = post.likes.length;
      console.log(totalLikes);
      return res.status(200).json({ totalLikes });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deletePost = async (req, res) => {
  try {
    console.log(req.params.id);
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    await post.deleteOne();
    const user = await User.findById(req.user._id);
    user.posts.pull(req.params.id);
    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getPostsOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = await Post.find({ owner: { $in: user.following } })
      .populate("owner", "name avtar") // Populate the 'owner' field with 'name' and 'avatar'
      .populate("comments.user", "name avtar") // Populate the 'comments.user' field with 'name' and 'avatar'
      .exec();

    const formattedPosts = posts.map((post) => {
      return {
        _id: post._id,
        caption: post.caption,
        image: post.image,
        owner: {
          _id: post.owner._id,
          name: post.owner.name,
          avtar: post.owner.avtar,
        },
        createdAt: post.createdAt,
        likes: post.likes,
        comments: post.comments,
        __v: post.__v,
      };
    });

    res.status(200).json({ posts: formattedPosts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.comments.push({
      user: req.user._id,
      comment: req.body.comment,
    });
    await post.save();
    return res.status(200).json({ message: "Comment added" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getallPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("owner", "name avtar")
      .populate("comments.user", "name avtar");
    const formattedPosts = posts.map((post) => {
      return {
        _id: post._id,
        caption: post.caption,
        image: post.image,
        owner: {
          _id: post.owner._id,
          name: post.owner.name,
          avtar: post.owner.avtar,
        },
        createdAt: post.createdAt,
        likes: post.likes,
        comments: post.comments,
        __v: post.__v,
      };
    });

    res.status(200).json({ posts: formattedPosts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.owner.toString() === req.user._id.toString()) {
      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.userId.toString()) {
          post.comments.pull(item._id);
        }
      });
      await post.save();
      return res.status(200).json({ message: "Selected comment deleted" });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          post.comments.pull(item._id);
        }
      });
      await post.save();
      return res.status(200).json({ message: "Your comment deleted" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const editPost = async (req, res) => {
  try {
    console.log(req.body);
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    if (req.body.caption) {
      post.caption = req.body.caption;
    }
    await post.save();
    return res.status(200).json({ message: "Post updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createPost,
  likeunlike,
  deletePost,
  getPostsOfFollowing,
  addComment,
  deleteComment,
  getallPosts,
  editPost,
};
