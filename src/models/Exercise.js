const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    muscleGroup: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
