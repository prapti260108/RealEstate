const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projects', // Reference to the Projects model
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^\d{10}$/.test(v);
      },
      message: "Phone must be 10 digits",
    },
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Inquiry", inquirySchema);
