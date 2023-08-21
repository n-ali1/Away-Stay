const express = require("express");
const router = express.Router();
const Place = require("../models/Place");
const jwt = require("jsonwebtoken");

const jwtSecret = "hf984yiunojdww90iu03u83hger89h4un498";

// POST /add_place- add place from form filled
router.post("/", async (req, res) => {
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