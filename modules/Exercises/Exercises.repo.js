const Exer = require("./Exercises.Model");

exports.isExist = async (filter) => {
  try {
    const Exercise = await Exer.findOne({ ExerciseName: filter });
    if (Exercise) {
      return {
        success: true,
        exercise: Exercise,
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
exports.GetAllExercies = async (filter) => {
  try {
    let exercise = await Exer.Find(filter);
    return {
      success: true,
      data: exercise,
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
exports.GetExerciseByGroup = async (filter) => {
  try {
    let exercise = await Exer.Find(filter);
    return {
      success: true,
      data: exercise,
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

exports.AddExercise = async (filter) => {
  try {
    let exercise = await this.isExist(filter);
    if (exercise.success == true) {
      return {
        success: false,
        error: "Exercise already Exists",
        code: 404,
      };
    } else {
      const newExercise = new Exer(filter);
      await newExercise.save();
      if (newExercise) {
        return {
          success: true,
          data: newExercise,
          code: 200,
        };
      } else {
        return {
          success: false,
          error: "Unable to Create Exercise",
          code: 404,
        };
      }
    }
  } catch (err) {}
};

exports.DeleteExercise = async (filter) => {
  try {
    let exercise = await this.isExist(filter);
    if (exercise.success == true) {
      await Exer.findOneAndDelete({ ExerciseName: filter });
      return {
        success: true,
        data: exercise,
        code: 200,
      };
    } else {
      return {
        success: false,
        error: "Exercise Not Found",
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
