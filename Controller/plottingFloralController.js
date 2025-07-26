const PlottingFloral = require('../Model/plottingFloralModel');
const multer = require('multer');
const path = require('path');

// --- Multer middleware inside controller file ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// --- Export middleware to use in routes ---
exports.uploadVillaImage = upload.single('image');

// --- Add new villa ---
exports.addVilla = async (req, res) => {
  try {
    const { bhkType, area, facilities } = req.body;
    const image = req.file?.filename;

    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    let parsedFacilities = facilities;
    if (typeof facilities === 'string') {
      parsedFacilities = JSON.parse(facilities);
    }

    const villa = await PlottingFloral.create({
      image,
      bhkType,
      area,
      facilities: parsedFacilities
    });

    res.status(201).json(villa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- Get all villas ---
exports.getAllVillas = async (req, res) => {
  try {
    const villas = await PlottingFloral.find();
    res.status(200).json(villas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Get villa by ID ---
exports.getVillaById = async (req, res) => {
  try {
    const villa = await PlottingFloral.findById(req.params.id);
    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }
    res.status(200).json(villa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Delete villa ---
exports.deleteVilla = async (req, res) => {
  try {
    const deleted = await PlottingFloral.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Villa not found for deletion' });
    }
    res.status(200).json({ message: 'Deleted successfully', data: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};