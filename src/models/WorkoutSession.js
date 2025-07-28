const mongoose = require("mongoose");

const setSchema = new mongoose.Schema(
  {
    reps: Number,
    weight: Number,
  },
  { _id: false }
);

const exerciseLogSchema = new mongoose.Schema(
  {
    name: String,
    sets: [setSchema],
  },
  { _id: false }
);

const workoutSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    exercises: [exerciseLogSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkoutSession", workoutSessionSchema);
