const express = require('express');
const Contactrouter = express.Router();
const contactController = require('../Controller/contactController');

Contactrouter.post('/submit', contactController.submitContactForm);

module.exports = Contactrouter;