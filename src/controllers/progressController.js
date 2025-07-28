const WorkoutSession = require("../models/WorkoutSession");

exports.getExerciseProgress = async (req, res) => {
  const { exerciseName } = req.params;
  const userId = req.user.id;

  try {
    // Get latest 2 sessions with this exercise
    const sessions = await WorkoutSession.find({
      userId,
      "exercises.name": exerciseName,
    })
      .sort({ date: -1 })
      .limit(2)
      .lean();

    if (sessions.length === 0) {
      return res.status(404).json({ msg: "No workout found for this exercise." });
    }

    const [current, previous] = sessions;

    const extractSets = (session) =>
      session?.exercises?.find((ex) => ex.name === exerciseName)?.sets || [];

    const currentSets = extractSets(current);
    const previousSets = extractSets(previous);

  const compareSets = () => {
  const suggestions = [];

  for (let i = 0; i < currentSets.length; i++) {
    const curr = currentSets[i];
    const prev = previousSets[i];

    if (!prev) continue;

    const repDiff = curr.reps - prev.reps;
    const weightDiff = curr.weight - prev.weight;

    let tip = "";

    if (weightDiff > 0 || repDiff > 0) {
      tip = "Improved";
    } else if (weightDiff < 0 || repDiff < 0) {
      tip = "You did less than before. Try to push harder next time.";
    } else {
      // No improvement: suggest 5% increase
      const suggestedWeight = Math.round(curr.weight * 1.05);
      tip = `Same as before. Try adding more reps or increase weight to ~${suggestedWeight}kg next time.`;
    }

    suggestions.push({
      set: i + 1,
      previous: prev,
      current: curr,
      repsChange: repDiff,
      weightChange: weightDiff,
      tip,
    });
  }

  return suggestions;
};


    const suggestions = previousSets.length ? compareSets() : [];

    res.json({
      currentDate: current.date,
      previousDate: previous?.date || null,
      currentSets,
      previousSets,
      suggestions,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
