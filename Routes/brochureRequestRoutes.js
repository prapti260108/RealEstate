const express = require('express');
const brochurerouter = express.Router();
const brochureRequestController = require('../Controller/brochureRequestController');

brochurerouter.post('/brochure_requests', brochureRequestController.submitBrochureRequest);
brochurerouter.get('/brochure_requests', brochureRequestController.getBrochureRequests);

module.exports = brochurerouter;