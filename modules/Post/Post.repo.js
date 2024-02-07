let Post = require("./Post.Model");

exports.isExist = async (filter) => {
  try {
    const post = await Post.findOne(filter);
    if (post) {
      return {
        success: true,
        post: post,
        code: 200,
      };
    } else {
      return {
        success: false,
        err: "post not found",
        code: 404,
      };
    }
  } catch (err) {
    console.log("Error", err.message);
    return {
      success: false,
      code: 500,
      error: "Unexpected Error",
    };
  }
};
exports.GetPosts = async (filter) => {
  try {
    let post = await Post.findOne(filter);
    if (post) {
      return {
        success: true,
        post: post,
        code: 200,
      };
    } else {
      return {
        success: false,
        err: "post not found",
        code: 404,
      };
    }
  } catch (err) {
    console.log("Error", err.message);
    return {
      success: false,
      code: 500,
      error: "Unexpected Error",
    };
  }
};

exports.ListPosts = async (filter) => {
  try {
    let posts = await Post.find(filter);
    return {
      success: true,
      data: posts,
      code: 200,
    };
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: "Unexpected Error",
    };
  }
};

exports.CreatePost = async (filter) => {
  try {
    const newPost = new Post(filter);
    await newPost.save();
    if (newPost) {
      return {
        success: true,
        data: newPost,
        code: 201,
      };
    } else {
      return {
        success: false,
        error: "Unable to Create Post",
        code: 404,
      };
    }
  } catch (err) {
    return {
      success: false,
      error: "Unexpected Error",
      code: 500,
    };
  }
};

exports.DeletePost = async (id) => {
  try {
    const post = await this.isExist({ id });
    if (post.success) {
      await Post.findByIdAndDelete({ id });
      return {
        success: true,
        post: post,
        code: 200,
      };
    } else {
      return {
        success: false,
        error: "Post Not Found!",
        code: 404,
      };
    }
  } catch (err) {
    return {
      success: false,
      error: "Unexpected Error",
      code: 500,
    };
  }
};
