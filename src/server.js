const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/workouts", require("./routes/workouts"));
app.use("/api/progress", require("./routes/progress"));
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api/user", require("./routes/user"));

connectDB()
  .then(() => {
    console.log("Database Connection established");
    app.listen(7000, () => {
      console.log("server is successfully listning on port 7000........");
    });
  })
  .catch((error) => {
    console.error("Database cannot be connected");
  });
