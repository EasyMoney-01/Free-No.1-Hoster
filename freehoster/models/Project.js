const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  projectId: {
    type: String,
    unique: true,
    required: true
  },
  language: {
    type: String,
    enum: ['nodejs', 'python', 'static', 'unknown'],
    default: 'unknown'
  },
  envVars: {
    type: Map,
    of: String
  },
  subdomain: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'building', 'running', 'stopped', 'failed'],
    default: 'pending'
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
  resourceLimits: {
    ram: {
      type: Number, // in MB
      default: 512
    },
    cpu: {
      type: Number, // in percentage
      default: 50
    },
    storage: {
      type: Number, // in MB
      default: 100
    }
  },
  autoDeploy: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);