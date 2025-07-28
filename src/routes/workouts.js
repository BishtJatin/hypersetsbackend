const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createWorkout, getWorkouts } = require("../controllers/workoutController");

router.post("/", auth, createWorkout);
router.get("/", auth, getWorkouts);

module.exports = router;
