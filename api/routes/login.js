const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "hf984yiunojdww90iu03u83hger89h4un498";

// POST /login - Login a user
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const passMatch = bcrypt.compareSync(req.body.pass, user.password);
      if (passMatch) {
        jwt.sign(
          { email: user.email, id: user._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(user);
            console.log(token);
          }
        );
      } else {
        res.status(401).json("incorrect pass");
      }
    } else {
      res.status(401).json("not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const userData = await User.findById(user.id, "_id email fname lname")
      res.json(userData);
    });
  } else {
    res.json(null);
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
})

module.exports = router;

