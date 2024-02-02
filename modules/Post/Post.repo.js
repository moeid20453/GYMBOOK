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
        err: "User not found",
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
