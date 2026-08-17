import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.memoryStorage();

function checkFileTypes(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Images only! (jpg, jpeg, png, webp)"));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  },
});

router.post("/", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || "File upload error" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    res.json({
      message: "Image uploaded successfully",
      image: base64Image,
    });
  });
});

export default router;

