const WorkoutSession = require("../models/WorkoutSession");
const User = require("../models/user");

exports.getLeaderboard = async (req, res) => {
  try {
    const results = await WorkoutSession.aggregate([
      {
        $group: {
          _id: "$userId",
          sessionCount: { $sum: 1 },
        },
      },
      { $sort: { sessionCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          name: "$user.name",
          email: "$user.email",
          sessionCount: 1,
        },
      },
    ]);

    res.json(results);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
