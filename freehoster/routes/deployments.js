const express = require('express');
const router = express.Router();
const {
  deployProject,
  getDeploymentLogs,
  stopDeployment,
  startDeployment,
  deleteDeployment
} = require('../controllers/deploymentsController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

// Deploy project
router.post('/project/:projectId', deployProject);

// Get deployment logs
router.get('/:deploymentId/logs', getDeploymentLogs);

// Stop deployment
router.post('/:deploymentId/stop', stopDeployment);

// Start deployment
router.post('/:deploymentId/start', startDeployment);

// Delete deployment
router.delete('/:deploymentId', deleteDeployment);

module.exports = router;