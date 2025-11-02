# FreeHoster

A platform to host bots, websites, or apps for free, similar to Render or Vercel.

## Features

- Simple signup/login system (email + password)
- Upload or connect GitHub repo containing apps/bots
- Automatic detection of Node.js, Python, or Static HTML projects
- Deploy projects in free containers (sandbox)
- Live logs (like Render console)
- Free subdomain generation (https://username.freehoster.app)
- Dashboard to view all hosted apps (Start / Stop / Delete options)
- Support for .env environment variables
- Simple resource limits (RAM, CPU, storage)
- Auto-redeploy from GitHub when user pushes new code
- Modern, clean UI using TailwindCSS + React

## Tech Stack

### Frontend
- React (TypeScript)
- TailwindCSS
- Axios for API requests
- React Router for navigation

### Backend
- Node.js + Express
- MongoDB (Mongoose) for database
- JWT for authentication
- Docker or PM2 for container management
- Nginx for domain routing

## Project Structure

```
freehoster/
├── client/              # React frontend
│   ├── public/          # Static assets
│   └── src/             # Source code
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       ├── services/    # API services
│       ├── App.tsx      # Main app component
│       └── index.tsx    # Entry point
├── controllers/         # Request handlers
├── middleware/          # Custom middleware
├── models/              # Database models
├── routes/              # API routes
├── config/              # Configuration files
├── .env                 # Environment variables
├── server.js            # Server entry point
└── package.json         # Backend dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Docker (for containerization)

### Backend Setup
1. Navigate to the root directory:
   ```bash
   cd freehoster
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `POST /api/projects` - Create a new project (protected)
- `GET /api/projects` - Get all projects for user (protected)
- `GET /api/projects/:id` - Get project by ID (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)
- `POST /api/projects/detect-language` - Detect project language

### Deployments
- `POST /api/deployments/project/:projectId` - Deploy project (protected)
- `GET /api/deployments/:deploymentId/logs` - Get deployment logs (protected)
- `POST /api/deployments/:deploymentId/start` - Start deployment (protected)
- `POST /api/deployments/:deploymentId/stop` - Stop deployment (protected)
- `DELETE /api/deployments/:deploymentId` - Delete deployment (protected)

## Development

### Backend Development
```bash
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development
```bash
cd client
npm start  # Start React development server
```

## Building for Production

### Backend
```bash
npm start
```

### Frontend
```bash
cd client
npm run build
```

## Future Enhancements

- Add email verification using Nodemailer
- Implement admin dashboard for monitoring usage
- Add webhook support for GitHub auto-deploy
- Implement resource monitoring and alerts
- Add support for custom domains
- Implement project templates
- Add team collaboration features

## License

MIT License