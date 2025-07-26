// const Project = require('../Model/ProjectModel');
// const path = require('path');
// const fs = require('fs');

// exports.addProject = async (req, res) => {
//   try {
//     const { companyName, description, details, establishedYear, status, location, properties, priceRange, superArea, carpetArea, propertyType, floorsRequired, projectTimeline, suggestion, isOwner } = req.body;
//     let imageUrl = '';
//     let brochureUrl = '';
//     let screenshots = [];

//     // Check if req.files exists before accessing
//     if (req.files && req.files['imageUrl']) {
//       imageUrl = `/uploads/${req.files['imageUrl'][0].filename}`;
//     } else {
//       console.log('No main image uploaded');
//     }
//     if (req.files && req.files['brochureUrl']) {
//       brochureUrl = `/uploads/${req.files['brochureUrl'][0].filename}`;
//     } else {
//       console.log('No brochure uploaded');
//     }
//     if (req.files && req.files['screenshots']) {
//       screenshots = req.files['screenshots'].map(file => `/uploads/${file.filename}`);
//     } else {
//       console.log('No screenshots uploaded');
//     }

//     let parsedDetails = {};
//     if (typeof details === 'string') {
//       try {
//         parsedDetails = JSON.parse(details);
//       } catch (e) {
//         console.error('Invalid JSON in details field:', e);
//         parsedDetails = {};
//       }
//     } else {
//       parsedDetails = details || {};
//     }

//     const project = new Project({
//       companyName: companyName || '',
//       description: description || '',
//       details: {
//         overview: parsedDetails.overview || '',
//         projectsCount: parseInt(parsedDetails.projectsCount) || 0,
//         ongoingCount: parseInt(parsedDetails.ongoingCount) || 0,
//         rating: parseFloat(parsedDetails.rating) || 0
//       },
//       establishedYear: parseInt(establishedYear) || null,
//       imageUrl,
//       status: status || 'under construction',
//       location: location || '',
//       properties: properties || '',
//       brochureUrl,
//       priceRange: {
//         min: parseInt(priceRange?.min) || 1,
//         max: parseInt(priceRange?.max) || 100000000
//       },
//       superArea: {
//         min: parseInt(superArea?.min) || 0,
//         max: parseInt(superArea?.max) || 0
//       },
//       carpetArea: {
//         min: parseInt(carpetArea?.min) || 0,
//         max: parseInt(carpetArea?.max) || 0
//       },
//       propertyType: propertyType || '',
//       floorsRequired: floorsRequired || 'All Floors',
//       projectTimeline: projectTimeline || 'Any Timeline',
//       suggestion: suggestion || '',
//       screenshots,
//       isOwner: isOwner === 'true' // Added as a fallback, though not in the current schema; remove if unintended
//     });

//     const savedProject = await project.save();
//     res.status(201).json(savedProject);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.getProjects = async (req, res) => {
//   try {
//     const { location, minPrice, maxPrice, propertyType, minSuperArea, maxSuperArea, minCarpetArea, maxCarpetArea, floorsRequired, projectTimeline } = req.query;
//     let query = {};

//     if (location) query.location = new RegExp(location, 'i');
//     if (minPrice || maxPrice) query['priceRange.min'] = {}; // Adjust for nested priceRange
//     if (minPrice) query['priceRange.min'].$gte = parseInt(minPrice);
//     if (maxPrice) query['priceRange.max'].$lte = parseInt(maxPrice);
//     if (propertyType) query.propertyType = propertyType;
//     if (minSuperArea || maxSuperArea) query['superArea.min'] = {};
//     if (minSuperArea) query['superArea.min'].$gte = parseInt(minSuperArea);
//     if (maxSuperArea) query['superArea.max'].$lte = parseInt(maxSuperArea);
//     if (minCarpetArea || maxCarpetArea) query['carpetArea.min'] = {};
//     if (minCarpetArea) query['carpetArea.min'].$gte = parseInt(minCarpetArea);
//     if (maxCarpetArea) query['carpetArea.max'].$lte = parseInt(maxCarpetArea);
//     if (floorsRequired) query.floorsRequired = floorsRequired;
//     if (projectTimeline) query.projectTimeline = projectTimeline;

//     const projects = await Project.find(query).limit(15); // Limit to 15 results as per frontend design
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: 'Project not found' });
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateProject = async (req, res) => {
//   try {
//     const { companyName, description, details, establishedYear, status, location, properties, priceRange, superArea, carpetArea, propertyType, floorsRequired, projectTimeline, suggestion } = req.body;
//     const updateData = {
//       companyName,
//       description,
//       details: {
//         overview: details.overview,
//         projectsCount: parseInt(details.projectsCount),
//         ongoingCount: parseInt(details.ongoingCount),
//         rating: parseFloat(details.rating)
//       },
//       establishedYear: parseInt(establishedYear),
//       status,
//       location,
//       properties,
//       priceRange: {
//         min: parseInt(priceRange?.min),
//         max: parseInt(priceRange?.max)
//       },
//       superArea: {
//         min: parseInt(superArea?.min),
//         max: parseInt(superArea?.max)
//       },
//       carpetArea: {
//         min: parseInt(carpetArea?.min),
//         max: parseInt(carpetArea?.max)
//       },
//       propertyType,
//       floorsRequired,
//       projectTimeline,
//       suggestion
//     };
//     if (req.files && req.files['imageUrl']) {
//       updateData.imageUrl = `/uploads/${req.files['imageUrl'][0].filename}`;
//       const oldProject = await Project.findById(req.params.id);
//       if (oldProject && oldProject.imageUrl) {
//         fs.unlinkSync(path.join(__dirname, '..', 'public', oldProject.imageUrl));
//       }
//     }
//     if (req.files && req.files['brochureUrl']) {
//       updateData.brochureUrl = `/uploads/${req.files['brochureUrl'][0].filename}`;
//       const oldProject = await Project.findById(req.params.id);
//       if (oldProject && oldProject.brochureUrl) {
//         fs.unlinkSync(path.join(__dirname, '..', 'public', oldProject.brochureUrl));
//       }
//     }
//     if (req.files && req.files['screenshots']) {
//       updateData.screenshots = req.files['screenshots'].map(file => `/uploads/${file.filename}`);
//       const oldProject = await Project.findById(req.params.id);
//       if (oldProject && oldProject.screenshots) {
//         oldProject.screenshots.forEach(img => fs.unlinkSync(path.join(__dirname, '..', 'public', img)));
//       }
//     }

//     const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
//     if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
//     res.json(updatedProject);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.deleteProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: 'Project not found' });
//     if (project.imageUrl) {
//       fs.unlinkSync(path.join(__dirname, '..', 'public', project.imageUrl));
//     }
//     if (project.brochureUrl) {
//       fs.unlinkSync(path.join(__dirname, '..', 'public', project.brochureUrl));
//     }
//     if (project.screenshots) {
//       project.screenshots.forEach(img => fs.unlinkSync(path.join(__dirname, '..', 'public', img)));
//     }
//     await Project.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Project deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



const Project = require('../Model/ProjectModel');
const path = require('path');
const fs = require('fs');

exports.addProject = async (req, res) => {
  try {
    const { 
      companyName, description, details, establishedYear, status, location, properties, 
      priceRange, superArea, carpetArea, propertyType, floorsRequired, projectTimeline, 
      suggestion, projectCategory, amenities 
    } = req.body;
    let imageUrl = '';
    let brochureUrl = '';
    let screenshots = [];

    // Check if req.files exists before accessing
    if (req.files && req.files['imageUrl']) {
      imageUrl = `/Uploads/${req.files['imageUrl'][0].filename}`;
    } else {
      console.log('No main image uploaded');
    }
    if (req.files && req.files['brochureUrl']) {
      brochureUrl = `/Uploads/${req.files['brochureUrl'][0].filename}`;
    } else {
      console.log('No brochure uploaded');
    }
    if (req.files && req.files['screenshots']) {
      screenshots = req.files['screenshots'].map(file => `/Uploads/${file.filename}`);
    } else {
      console.log('No screenshots uploaded');
    }

    let parsedDetails = {};
    if (typeof details === 'string') {
      try {
        parsedDetails = JSON.parse(details);
      } catch (e) {
        console.error('Invalid JSON in details field:', e);
        parsedDetails = {};
      }
    } else {
      parsedDetails = details || {};
    }

    let parsedAmenities = {};
    if (typeof amenities === 'string') {
      try {
        parsedAmenities = JSON.parse(amenities);
      } catch (e) {
        console.error('Invalid JSON in amenities field:', e);
        parsedAmenities = {};
      }
    } else {
      parsedAmenities = amenities || {};
    }

    const project = new Project({
      companyName: companyName || '',
      description: description || '',
      details: {
        overview: parsedDetails.overview || '',
        projectsCount: parseInt(parsedDetails.projectsCount) || 0,
        ongoingCount: parseInt(parsedDetails.ongoingCount) || 0,
        rating: parseFloat(parsedDetails.rating) || 0
      },
      establishedYear: parseInt(establishedYear) || null,
      imageUrl,
      status: status || 'under construction',
      location: location || '',
      properties: properties || '',
      brochureUrl,
      priceRange: {
        min: parseInt(priceRange?.min) || 1,
        max: parseInt(priceRange?.max) || 100000000
      },
      superArea: {
        min: parseInt(superArea?.min) || 0,
        max: parseInt(superArea?.max) || 0
      },
      carpetArea: {
        min: parseInt(carpetArea?.min) || 0,
        max: parseInt(carpetArea?.max) || 0
      },
      propertyType: propertyType || '',
      floorsRequired: floorsRequired || 'All Floors',
      projectTimeline: projectTimeline || 'Any Timeline',
      suggestion: suggestion || '',
      screenshots,
      projectCategory: projectCategory || '',
      amenities: {
        parking: parsedAmenities.parking === true || false,
        garden: parsedAmenities.garden === true || false,
        swimmingPool: parsedAmenities.swimmingPool === true || false
      }
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const { 
      location, minPrice, maxPrice, propertyType, minSuperArea, maxSuperArea, 
      minCarpetArea, maxCarpetArea, floorsRequired, projectTimeline, projectCategory, 
      parking, garden, swimmingPool 
    } = req.query;
    let query = {};

    if (location) query.location = new RegExp(location, 'i');
    if (minPrice || maxPrice) query['priceRange.min'] = {};
    if (minPrice) query['priceRange.min'].$gte = parseInt(minPrice);
    if (maxPrice) query['priceRange.max'].$lte = parseInt(maxPrice);
    if (propertyType) query.propertyType = propertyType;
    if (minSuperArea || maxSuperArea) query['superArea.min'] = {};
    if (minSuperArea) query['superArea.min'].$gte = parseInt(minSuperArea);
    if (maxSuperArea) query['superArea.max'].$lte = parseInt(maxSuperArea);
    if (minCarpetArea || maxCarpetArea) query['carpetArea.min'] = {};
    if (minCarpetArea) query['carpetArea.min'].$gte = parseInt(minCarpetArea);
    if (maxCarpetArea) query['carpetArea.max'].$lte = parseInt(maxCarpetArea);
    if (floorsRequired) query.floorsRequired = floorsRequired;
    if (projectTimeline) query.projectTimeline = projectTimeline;
    if (projectCategory) query.projectCategory = projectCategory;
    if (parking) query['amenities.parking'] = parking === 'true';
    if (garden) query['amenities.garden'] = garden === 'true';
    if (swimmingPool) query['amenities.swimmingPool'] = swimmingPool === 'true';

    const projects = await Project.find(query).limit(15);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { 
      companyName, description, details, establishedYear, status, location, properties, 
      priceRange, superArea, carpetArea, propertyType, floorsRequired, projectTimeline, 
      suggestion, projectCategory, amenities 
    } = req.body;
    const updateData = {
      companyName,
      description,
      details: {
        overview: details?.overview,
        projectsCount: parseInt(details?.projectsCount),
        ongoingCount: parseInt(details?.ongoingCount),
        rating: parseFloat(details?.rating)
      },
      establishedYear: parseInt(establishedYear),
      status,
      location,
      properties,
      priceRange: {
        min: parseInt(priceRange?.min),
        max: parseInt(priceRange?.max)
      },
      superArea: {
        min: parseInt(superArea?.min),
        max: parseInt(superArea?.max)
      },
      carpetArea: {
        min: parseInt(carpetArea?.min),
        max: parseInt(carpetArea?.max)
      },
      propertyType,
      floorsRequired,
      projectTimeline,
      suggestion,
      projectCategory,
      amenities: {
        parking: amenities?.parking === true,
        garden: amenities?.garden === true,
        swimmingPool: amenities?.swimmingPool === true
      }
    };
    if (req.files && req.files['imageUrl']) {
      updateData.imageUrl = `/Uploads/${req.files['imageUrl'][0].filename}`;
      const oldProject = await Project.findById(req.params.id);
      if (oldProject && oldProject.imageUrl) {
        fs.unlinkSync(path.join(__dirname, '..', 'public', oldProject.imageUrl));
      }
    }
    if (req.files && req.files['brochureUrl']) {
      updateData.brochureUrl = `/Uploads/${req.files['brochureUrl'][0].filename}`;
      const oldProject = await Project.findById(req.params.id);
      if (oldProject && oldProject.brochureUrl) {
        fs.unlinkSync(path.join(__dirname, '..', 'public', oldProject.brochureUrl));
      }
    }
    if (req.files && req.files['screenshots']) {
      updateData.screenshots = req.files['screenshots'].map(file => `/Uploads/${file.filename}`);
      const oldProject = await Project.findById(req.params.id);
      if (oldProject && oldProject.screenshots) {
        oldProject.screenshots.forEach(img => fs.unlinkSync(path.join(__dirname, '..', 'public', img)));
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.imageUrl) {
      fs.unlinkSync(path.join(__dirname, '..', 'public', project.imageUrl));
    }
    if (project.brochureUrl) {
      fs.unlinkSync(path.join(__dirname, '..', 'public', project.brochureUrl));
    }
    if (project.screenshots) {
      project.screenshots.forEach(img => fs.unlinkSync(path.join(__dirname, '..', 'public', img)));
    }
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};