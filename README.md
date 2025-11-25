# Gig Buddy: Local Live Gigs Web Application

A full-stack web application for sharing and managing collections of local live music gigs.

## Project Overview

This project is a comprehensive web application that allows users to:
- Browse live gigs from various venues
- Create personal collections of favorite gigs
- Manage their own gig listings
- Connect with other music enthusiasts
- Share gig discoveries with the community

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Redux Toolkit** - State management with Redux
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **CSS Modules** - Component-scoped styling
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

## Project Structure

```
react-web-app/
├── server/                     # Backend API
│   ├── config/                 # Database and app configuration
│   │   └── database.js        # PostgreSQL connection setup
│   ├── middleware/             # Express middleware
│   │   └── auth.js            # JWT authentication middleware
│   ├── routes/                # API route handlers
│   │   ├── auth.js            # Authentication endpoints
│   │   ├── gigs.js            # Gig management endpoints
│   │   ├── collections.js     # Collection management endpoints
│   │   └── users.js           # User management endpoints
│   ├── scripts/               # Database and utility scripts
│   │   └── migrate.js         # Database migration script
│   ├── package.json           # Backend dependencies
│   └── server.js              # Express server entry point
│
├── src/                       # Frontend React application
│   ├── components/            # Reusable React components
│   │   └── forms/            # Form components
│   │       └── LoginForm.js  # User authentication form
│   ├── store/                # Redux store configuration
│   │   └── store.js          # Redux store with reducers
│   ├── styles/               # Global and component styles
│   ├── utils/                # Utility functions
│   ├── constants.js          # App constants and configuration
│   ├── App.js                # Main React application component
│   └── index.js              # React app entry point
│
├── public/                    # Static files
│   └── index.html            # HTML template
│
├── package.json              # Frontend dependencies
└── README.md                 # Project documentation
```
