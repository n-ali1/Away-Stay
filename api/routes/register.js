const express = require("express");
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")

// POST /register - Create a new user
router.post("/", async (req, res) => {
  try {
    const user = await User.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.pass)
    })
    res.json(user)
} catch (error) {
    res.status(500).json({ message: error.message })
}
});

module.exports = router;
