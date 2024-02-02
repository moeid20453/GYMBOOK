let mongoose = require("mongoose");

let ExerciseSchema = mongoose.Schema({
  ExerciseName: String,
  MuscleGroup: String,
});

let exerciseModel = mongoose.model("Exercises", ExerciseSchema);

module.exports = exerciseModel;
