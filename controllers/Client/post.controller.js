let Post = require("../modules/Post/Post.repo");
let User = require("../modules/User/User.repo");

const getAllPosts = async (req, res) => {
  try {
    let allPosts = await Post.ListPosts({});
    if (allPosts.success == true) {
      res.status(allPosts.code).json({ posts: allPosts.data });
    } else {
      res.status(allPosts.code).json({ error: allPosts.error });
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected Error" });
  }
};
const GetPost = async (req, res) => {
  try {
    let id = req.params.id;
    let post = await Post.GetPost({ _id: id });
    if (post.success == true) {
      res.status(post.code).json({ post: post.post });
    } else {
      res.status(post.code).json({ post: post.error });
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected Error" });
  }
};

const getPostsByCategory = async (req, res) => {
  try {
    const Postcat = req.params.category;
    if (Postcat) {
      let posts = await Post.ListPosts({ cat: Postcat });
      if (posts.success == true) {
        res.status(posts.code).json({ Posts: posts.data });
      } else {
        res.status(posts.code).json({ error: posts.error });
      }
    }
  } catch (Err) {
    res.status(500).json({ error: "Unexpected error" });
  }
};

const addNewPost = async (req, res) => {
  try {
    let image = req.files;
    let userId = req.body.userId;
    console.log({ image: image });
    const post = {
      userid: userId,
      title: req.body.title,
      content: req.body.content,
      cat: req.body.cat,
      date: req.body.date,
      img: image,
    };
    let newpost = await Post.CreatePost(post);
    if (newpost.success == true) {
      res.status(newpost.code).json({ post: newpost.data });
      await User.update({ _id: userId }, { post: post });
    } else {
      res.status(newpost.code).json({ error: newpost.error });
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error" });
  }

  res.status(200).json({ message: "success", Post });
};

const deletePost = async (req, res) => {
  try {
    const targetPostId = req.params.PostId;
    let post = await Post.DeletePost({ _id: targetPostId });
    if (post.success == true) {
      {
        res.status(post.code).json({ post: post.data });
      }
    } else {
      res.status(post.code).json({ error: post.error });
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error" });
  }
};

module.exports = {
  getAllPosts,
  GetPost,
  getPostsByCategory,
  addNewPost,
  deletePost,
};
