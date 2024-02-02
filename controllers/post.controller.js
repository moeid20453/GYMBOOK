let post = require("../model/Post.Model");
let User = require("../model/User.Model");

let getAllPosts = async (req, res) => {
  let allPosts = await Post.find({});
  if (allPosts) {
    res.status(200).json({ allPosts });
  } else res.status(502).json({ message: "there is no Posts" });
};

let getPostsByCategory = async (req, res) => {
  const Postcat = req.params.category;
  if (Postcat) {
    let posts = await Post.find({ cat: Postcat });
    if (posts) {
      res.status(200).json({ Posts: posts });
    } else {
      res
        .status(404)
        .json({ message: "There are no Posts with this category" });
    }
  }
};

let addNewPost = async (req, res) => {
  let image = req.files;
  console.log({image: image});
  const Post = await new Post({title:req.body.title,content:req.body.content, cat: req.body.cat, date:req.body.date, img: image});
  await Postg.save();
  // await Post.findByIdAndUpdate(Post._id,{image: image[0]})
  await User.findByIdAndUpdate(
    { _id: req.body.userid },
    { $push: { userPosts: Post._id } }
  );
  res.status(200).json({ message: "success", Post });
};

let updatePost = async (req, res) => {
  const targetPost = req.body.PostId;
  let { title, content } = req.body;
  await Post.findByIdAndUpdate({ _id: targetPost }, { title, content });
  res.status(200).json({ message: "success", user });
};

let deletePost = async (req, res) => {
  const targetPostId = req.params.PostId;
  const targetuserId = req.params.userId;

  await Post.findByIdAndDelete({ _id: targetPostId });
  await User.findByIdAndUpdate(
    { _id: targetuserId },
    { $pull: { userPosts: targetPostId } }
  );
  res.status(201).json({ message: "success" });
};

module.exports = {
  getAllPosts,
  getPostsByCategory,
  addNewPost,
  updatePost,
  deletePost,
};
