const express = require('express');
const router = express.Router();
const { 
  createProject, 
  getProjects, 
  getProjectById, 
  updateProject, 
  deleteProject,
  detectLanguage
} = require('../controllers/projectsController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

// Create project
router.post('/', createProject);

// Get all projects
router.get('/', getProjects);

// Get project by ID
router.get('/:id', getProjectById);

// Update project
router.put('/:id', updateProject);

// Delete project
router.delete('/:id', deleteProject);

// Detect project language
router.post('/detect-language', detectLanguage);

module.exports = router;