const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'building', 'deploying', 'running', 'stopped', 'failed'],
    default: 'pending'
  },
  commitHash: {
    type: String
  },
  buildLogs: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    message: {
      type: String
    }
  }],
  deploymentUrl: {
    type: String
  },
  containerId: {
    type: String
  },
  deployedAt: {
    type: Date
  },
  stoppedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Deployment', deploymentSchema);