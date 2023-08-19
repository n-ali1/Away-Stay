const express = require("express");
const router = express.Router();
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

// Upload by link
router.post("/link", async (req, res) => {
  const { link } = req.body;
  const imgName = Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + imgName,
  });
  res.json(imgName);
});

// Upload by local saved
const photosMiddleware = multer({ dest: "routes/uploads/" });
router.post(
  "/upload",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const segments = originalname.split(".");
      const ext = segments[segments.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("routes\\uploads\\", ""));
    }
    res.json(uploadedFiles);
  }
);

module.exports = router;
