const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
  }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// app.get("/", (req, res) => {
//   res.json("working");
// });

// Define routes
app.use('/register', require('./routes/register')); // Route for registering users
app.use('/login', require('./routes/login')); // Route for logging in users

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
