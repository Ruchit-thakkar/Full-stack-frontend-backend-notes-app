const express = require("express");
const cors = require("cors");
const connectTodb = require("./db/db");
const notesRoutes = require("./routes/notes.routes"); // Import your routes

const app = express();

// Connect to Database
connectTodb();

// Middleware
app.use(cors({ origin: "*" })); // Allow requests from frontend
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// This creates URLs like: http://localhost:8000/api/notes
app.use("/api", notesRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
