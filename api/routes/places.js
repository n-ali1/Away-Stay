const express = require("express");
const router = express.Router();
const Place = require("../models/Place");
const jwt = require("jsonwebtoken");

const jwtSecret = "hf984yiunojdww90iu03u83hger89h4un498";

// GET - /places - list saved places
router.get("/", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    const {id} = user;
    res.json(await Place.find({owner: id}))
  })
});

// POST /places/add - add place from form filled
router.post("/add", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    try {
      const place = await Place.create({
        owner: user.id,
        title: req.body.title,
        address: req.body.address,
        photos: req.body.photos,
        desc: req.body.description,
        perks: req.body.perks,
        extraInfo: req.body.extra,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        maxGuests: req.body.guests,
      });
      res.json(place);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
});

module.exports = router;
