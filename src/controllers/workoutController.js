const WorkoutSession = require("../models/WorkoutSession");

exports.createWorkout = async (req, res) => {
  const { date, exercises } = req.body;

  const session = new WorkoutSession({
    userId: req.user.id,
    date: date || Date.now(),
    exercises,
  });

  await session.save();
  res.status(201).json({ msg: "Workout saved" });
};

exports.getWorkouts = async (req, res) => {
  const workouts = await WorkoutSession.find({ userId: req.user.id }).sort({ date: -1 });
  res.json(workouts);
};
