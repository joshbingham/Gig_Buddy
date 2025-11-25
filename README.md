# Local Live Gigs Web Application

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

## Database Schema

### Users Table
```sql
users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar_url VARCHAR(500),
  location VARCHAR(100),
  website_url VARCHAR(500),
  social_links JSONB,
  role VARCHAR(20) DEFAULT 'member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Gigs Table
```sql
gigs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  venue VARCHAR(200) NOT NULL,
  event_date TIMESTAMP NOT NULL,
  genre VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  image_url VARCHAR(500),
  ticket_url VARCHAR(500),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Collections Table
```sql
collections (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Collection Gigs Junction Table
```sql
collection_gigs (
  collection_id INTEGER REFERENCES collections(id) ON DELETE CASCADE,
  gig_id INTEGER REFERENCES gigs(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (collection_id, gig_id)
)
```

### Genres Table
```sql
genres (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - User logout

### Gigs
- `GET /api/gigs` - Get all gigs (public)
- `GET /api/gigs/:id` - Get specific gig details
- `GET /api/gigs/my` - Get user's gigs (private)
- `POST /api/gigs` - Create new gig (private)
- `PUT /api/gigs/:id` - Update gig (private)
- `DELETE /api/gigs/:id` - Delete gig (private)

### Collections
- `GET /api/collections` - Get all public collections
- `GET /api/collections/my` - Get user's collections (private)
- `GET /api/collections/:id` - Get collection details
- `POST /api/collections` - Create new collection (private)
- `PUT /api/collections/:id` - Update collection (private)
- `DELETE /api/collections/:id` - Delete collection (private)
- `POST /api/collections/:id/gigs/:gigId` - Add gig to collection
- `DELETE /api/collections/:id/gigs/:gigId` - Remove gig from collection

### Users
- `GET /api/users` - Get all users (public)
- `GET /api/users/:id` - Get user profile (public)
- `GET /api/users/:id/gigs` - Get user's gigs (public)
- `GET /api/users/:id/collections` - Get user's collections (public)
- `PUT /api/users/:id` - Update user profile (private)

## Setup Instructions

### 1. Clone Repository
```bash
git clone <repository-url>
cd react-web-app
```

### 2. Backend Setup
```bash
cd server
npm install

# Create environment file
cp .env.example .env

# Edit .env with your database configuration
# DATABASE_URL=postgresql://username:password@localhost:5432/local_live_gigs
# JWT_SECRET=your-super-secret-jwt-key
# NODE_ENV=development

# Run database migration
npm run migrate

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
# In root directory
npm install

# Create environment file for frontend
cp .env.example .env

# Edit .env with API URL
# REACT_APP_API_BASE_URL=http://localhost:5000/api

# Start development server
npm start
```

### 4. Database Setup
```bash
# Create PostgreSQL database
createdb local_live_gigs

# Run migrations
cd server
npm run migrate
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/local_live_gigs
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
PORT=5000
```

### Frontend (.env)
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

## Development Workflow

### 1. Backend Development
- All backend code is in `/server` directory
- Use `npm run dev` for development with auto-reload
- All routes are documented with TODO comments
- Database schema is defined in migration scripts
- Authentication middleware handles JWT tokens

### 2. Frontend Development
- React app with Redux for state management
- Components are organized by feature
- Forms use controlled components with validation
- Routing handled by React Router
- CSS Modules for component styling

### 3. Database Management
- Use migration script to set up database
- All tables include proper indexes
- Foreign key constraints ensure data integrity
- Timestamps track creation and updates

## Features to Implement

### Phase 1: Core Functionality
- [x] Project structure setup
- [ ] User authentication (register/login)
- [ ] Gig CRUD operations
- [ ] Collection management
- [ ] Basic responsive UI

### Phase 2: Enhanced Features
- [ ] Search and filtering
- [ ] Image upload for gigs
- [ ] Social features (following users)
- [ ] Advanced collection sharing
- [ ] Email notifications

### Phase 3: Polish & Optimization
- [ ] Performance optimization
- [ ] Error handling improvements
- [ ] Accessibility features
- [ ] Testing implementation
- [ ] Progressive Web App features

## Deployment

### Backend Deployment (Render/Railway)
1. Connect GitHub repository
2. Set environment variables
3. Configure database (PostgreSQL)
4. Deploy automatically on push

### Frontend Deployment (Netlify/Vercel)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Configure environment variables
5. Deploy automatically on push

## Contributing

1. Create feature branch from main
2. Follow code style guidelines
3. Add tests for new features
4. Update documentation
5. Submit pull request

## Code Standards

### Backend
- Use async/await for all database operations
- Validate all input data
- Use proper HTTP status codes
- Include comprehensive error handling
- Follow RESTful API conventions

### Frontend
- Use functional components with hooks
- Implement proper state management
- Include form validation
- Follow React best practices
- Use semantic HTML elements

## Security Considerations

- Passwords are hashed using bcrypt
- JWT tokens expire after 24 hours
- All input is validated and sanitized
- HTTPS required in production
- Rate limiting on API endpoints
- SQL injection prevention with parameterized queries

## Performance Optimization

- Database queries use proper indexes
- React components use memoization where appropriate
- Images are optimized and lazy-loaded
- Bundle splitting for code optimization
- CDN for static assets in production

## Accessibility Features

- Semantic HTML elements
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management in forms

## Testing Strategy

### Backend Testing
- Unit tests for utility functions
- Integration tests for API endpoints
- Database testing with test fixtures
- Authentication flow testing

### Frontend Testing
- Component unit testing
- Redux store testing
- Form validation testing
- User interaction testing
- Visual regression testing

## License

MIT License - see LICENSE file for details

## Support

For questions or issues:
1. Check existing issues in GitHub
2. Create detailed bug report
3. Include steps to reproduce
4. Provide environment details

---

## Project Status

This project is currently in **Phase 1: Setup and Core Structure**. The basic project structure has been created with:

- ✅ Complete project folder structure
- ✅ Backend API framework with detailed implementation comments
- ✅ Database schema and migration scripts
- ✅ Frontend React app structure
- ✅ Redux store configuration
- ✅ Component templates with detailed comments

**Next Steps:**
1. Implement backend API endpoints
2. Set up database and run migrations
3. Create React components
4. Connect frontend to backend
5. Add user authentication
6. Implement CRUD operations

The skeleton is complete and ready for full implementation!