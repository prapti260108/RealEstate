const express = require('express');
const router = express.Router();
const controller = require('../Controller/plottingFloralController');

// Add villa with image upload middleware
router.post('/plottingFloral', controller.uploadVillaImage, controller.addVilla);

router.get('/plottingFloral', controller.getAllVillas);
router.get('/plottingFloral/:id', controller.getVillaById);
router.delete('/plottingFloral/:id', controller.deleteVilla);

module.exports = router;
