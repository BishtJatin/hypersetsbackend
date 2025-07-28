const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getExerciseProgress } = require("../controllers/progressController");

router.get("/:exerciseName", auth, getExerciseProgress);

module.exports = router;
