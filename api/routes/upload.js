const express = require("express");
const router = express.Router()
const imageDownloader = require('image-downloader')


router.post("/", async (req, res) => {
    const {link} = req.body
    const imgName = Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname+'/uploads/'+imgName
    })
    res.json(__dirname+'/uploads/'+imgName)
});

module.exports = router;
