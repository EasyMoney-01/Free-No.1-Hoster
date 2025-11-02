import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error
      console.error('Network error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { username: string; email: string; password: string }) => 
    api.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) => 
    api.post('/auth/login', data),
  
  getCurrentUser: () => 
    api.get('/auth/me'),
};

// Projects API
export const projectsAPI = {
  createProject: (data: any) => 
    api.post('/projects', data),
  
  getProjects: () => 
    api.get('/projects'),
  
  getProject: (id: string) => 
    api.get(`/projects/${id}`),
  
  updateProject: (id: string, data: any) => 
    api.put(`/projects/${id}`, data),
  
  deleteProject: (id: string) => 
    api.delete(`/projects/${id}`),
  
  detectLanguage: (data: { githubUrl: string }) => 
    api.post('/projects/detect-language', data),
};

// Deployments API
export const deploymentsAPI = {
  deployProject: (projectId: string) => 
    api.post(`/deployments/project/${projectId}`),
  
  getDeploymentLogs: (deploymentId: string) => 
    api.get(`/deployments/${deploymentId}/logs`),
  
  startDeployment: (deploymentId: string) => 
    api.post(`/deployments/${deploymentId}/start`),
  
  stopDeployment: (deploymentId: string) => 
    api.post(`/deployments/${deploymentId}/stop`),
  
  deleteDeployment: (deploymentId: string) => 
    api.delete(`/deployments/${deploymentId}`),
};

export default api;