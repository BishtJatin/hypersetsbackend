const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ✅ Use dynamic origin based on environment
const allowedOrigins = [
  "http://localhost:3000", // local React
  "https://hypersetsfrontend.vercel.app" // ✅ your actual Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/workouts", require("./routes/workouts"));
app.use("/api/progress", require("./routes/progress"));
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api/user", require("./routes/user"));

// ✅ Connect to DB and start server on correct port
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });
