const Contact = require('../Model/Contact');

exports.submitContactForm = async (req, res) => {
  try {
    const { fullName, email, phone, natureOfEnquiry } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !natureOfEnquiry) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = new Contact({
      fullName,
      email,
      phone,
      natureOfEnquiry,
    });

    const savedContact = await contact.save();
    res.status(201).json({ message: 'Form submitted successfully', data: savedContact });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};