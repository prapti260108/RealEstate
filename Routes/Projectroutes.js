// const express = require('express');
// const router = express.Router();
// const projectController = require('../Controller/ProjectController');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, '..', 'public', 'uploads');
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage: storage });

// router.post('/projects', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'brochure', maxCount: 1 }]), projectController.addProject);
// router.get('/projects', projectController.getProjects);
// router.get('/projects/:id', projectController.getProjectById);
// router.put('/projects/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'brochure', maxCount: 1 }]), projectController.updateProject);
// router.delete('/projects/:id', projectController.deleteProject);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const projectController = require('../Controller/ProjectController');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, '..', 'public', 'uploads');
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage: storage });

// router.post('/projects', upload.fields([
//   { name: 'imageUrl', maxCount: 1 },
//   { name: 'brochureUrl', maxCount: 1 },
//   { name: 'screenshots', maxCount: 10 }
// ]), projectController.addProject);

// router.get('/projects', projectController.getProjects);

// router.get('/projects/:id', projectController.getProjectById);

// router.put('/projects/:id', upload.fields([
//   { name: 'imageUrl', maxCount: 1 },
//   { name: 'brochureUrl', maxCount: 1 },
//   { name: 'screenshots', maxCount: 10 }
// ]), projectController.updateProject);

// router.delete('/projects/:id', projectController.deleteProject);

// module.exports = router;



const express = require('express');
const router = express.Router();
const projectController = require('../Controller/ProjectController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname,'uploads')
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/projects', upload.fields([
  { name: 'imageUrl', maxCount: 1 },
  { name: 'brochureUrl', maxCount: 1 },
  { name: 'screenshots', maxCount: 10 }
]), projectController.addProject);

router.get('/projects', projectController.getProjects);

router.get('/projects/:id', projectController.getProjectById);

router.put('/projects/:id', upload.fields([
  { name: 'imageUrl', maxCount: 1 },
  { name: 'brochureUrl', maxCount: 1 },
  { name: 'screenshots', maxCount: 10 }
]), projectController.updateProject);

router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
