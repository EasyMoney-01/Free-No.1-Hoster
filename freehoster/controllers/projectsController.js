const Project = require('../models/Project');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { name, description, githubUrl, envVars } = req.body;
    
    // Generate unique project ID
    const projectId = uuidv4();
    
    // Generate subdomain (username + project name)
    const user = await User.findById(req.user.id);
    const subdomain = `${user.username}-${name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
    
    // Create project
    const project = await Project.create({
      name,
      description,
      githubUrl,
      projectId,
      user: req.user.id,
      subdomain,
      envVars: envVars || {}
    });
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: {
        project
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all projects for user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: {
        projects
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        project
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { name, description, githubUrl, envVars, autoDeploy } = req.body;
    
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        name,
        description,
        githubUrl,
        envVars,
        autoDeploy
      },
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: {
        project
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Detect project language
exports.detectLanguage = async (req, res) => {
  try {
    // In a real implementation, this would analyze the GitHub repo
    // For now, we'll simulate detection based on common files
    const { githubUrl } = req.body;
    
    let language = 'unknown';
    
    // Simulate language detection
    if (githubUrl.includes('nodejs') || githubUrl.includes('node')) {
      language = 'nodejs';
    } else if (githubUrl.includes('python')) {
      language = 'python';
    } else if (githubUrl.includes('html') || githubUrl.includes('static')) {
      language = 'static';
    }
    
    res.status(200).json({
      success: true,
      data: {
        language
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};