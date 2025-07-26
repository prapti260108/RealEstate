const Slider = require("../Model/sliderModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `slider-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage }).single("image");

// Add slider
exports.addSlider = (req, res) => {
  upload(req, res, async function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    try {
      const slider = await Slider.create({ image: req.file.filename });
      res.status(201).json({ success: true, data: slider });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });
};

// Get all sliders
exports.getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.json({ success: true, data: sliders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update slider image
exports.updateSlider = (req, res) => {
  upload(req, res, async function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    try {
      const { id } = req.params;
      const oldSlider = await Slider.findById(id);
      if (!oldSlider) return res.status(404).json({ success: false, message: "Slider not found" });

      // Delete old image
      fs.unlinkSync(path.join("uploads", oldSlider.image));

      const updated = await Slider.findByIdAndUpdate(
        id,
        { image: req.file.filename },
        { new: true }
      );

      res.json({ success: true, data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });
};

// Delete slider
exports.deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findById(id);
    if (!slider) return res.status(404).json({ success: false, message: "Slider not found" });

    fs.unlinkSync(path.join("uploads", slider.image));
    await Slider.findByIdAndDelete(id);

    res.json({ success: true, message: "Slider deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
