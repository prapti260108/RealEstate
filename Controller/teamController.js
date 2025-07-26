const Team = require("../Model/teamModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `team-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage }).single("image");

// Add team member
exports.addTeam = (req, res) => {
  upload(req, res, async function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    try {
      const { title } = req.body;
      if (!title) return res.status(400).json({ success: false, message: "Title is required" });

      const team = await Team.create({ title, image: req.file.filename });
      res.status(201).json({ success: true, data: team });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });
};

// Get all team members
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.find();
    res.json({ success: true, data: team });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update team member
exports.updateTeam = (req, res) => {
  upload(req, res, async function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    try {
      const { id } = req.params;
      const { title } = req.body;

      const existing = await Team.findById(id);
      if (!existing) return res.status(404).json({ success: false, message: "Not found" });

      // Delete old image
      fs.unlinkSync(path.join("uploads", existing.image));

      const updated = await Team.findByIdAndUpdate(
        id,
        { title, image: req.file.filename },
        { new: true }
      );

      res.json({ success: true, data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });
};

// Delete team member
exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ success: false, message: "Not found" });

    fs.unlinkSync(path.join("uploads", team.image));
    await Team.findByIdAndDelete(id);

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
