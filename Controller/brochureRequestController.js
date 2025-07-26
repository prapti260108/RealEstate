const BrochureRequest = require('../Model/brochureRequestModel');
const Project = require('../Model/ProjectModel');

exports.submitBrochureRequest = async (req, res) => {
  try {
    const { projectId, name, mobileNo, emailId, projectType } = req.body;

    // Validate project exists
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const brochureRequest = new BrochureRequest({
      projectId,
      name,
      mobileNo,
      emailId,
      projectType
    });

    const savedRequest = await brochureRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.getBrochureRequests = async (req, res) => {
  try {
    const requests = await BrochureRequest.find().populate('projectId', 'companyName properties location');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};