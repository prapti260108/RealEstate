const express = require('express');
const router = express.Router();
const contactController = require('../Controller/contactController');

router.post('/contact', contactController.submitContactForm);

router.get('/contact', contactController.getContacts);

router.delete('/contact/:id', contactController.deleteContact);

module.exports = router;
