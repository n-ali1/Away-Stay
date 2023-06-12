const express = require("express");
const router = express.Router()
const User = require("../models/User")

// POST /register - Create a new user
router.post("/", async (req, res) => {
  try {
    await User.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.pass
    })
    const users = await User.find();
    res.json(users)
} catch (error) {
    res.status(500).json({ message: error.message })
}
});

module.exports = router;
