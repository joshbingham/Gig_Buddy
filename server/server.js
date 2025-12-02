  // =============================================================================
 // 1. IMPORTS SECTION
 // =============================================================================
 // Add all necessary imports here (Express, middleware, database, routes.):
 
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

   // import authRoutes from './routes/auth.js';

 // =============================================================================
 // 2. SWAGGER CONFIGURATION SECTION
 // =============================================================================
 // Set up Swagger for API documentation

 // - Define swaggerOptions object


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gig Buddy API',
      version: '1.0.0',
      description: 'API documentation for the Gig Buddy application',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  components:{
    securitySchemes{
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFromat:
'JWT' 
   },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};


/*
=========================
/function: configuration object that defines the base structure of your API doc using the OpenAPI 3.0 spec
/why: provides essential metadata about the API, (title, version etc) and tells Swagger where to find detailed endpoint info
/how: - definition object sets up OpenAPI spec with API info and server details...
/how: - the apis array uses a glob pattern to scan your route files /routes/*.js for JSDoc comments describing individual endpoints
/how: - the [info] object displays info at top of Swagger UI to make it clear what the API is for
/how: - the [servers] array lists the environments where the API runs - so can test endpoints against diferent servers directly in the Swagger UI
/how: - each server has a [url] (dynamically set from env variables) and a [description] (set below to localhost)
/how: - the [components] object defines reusable elements like security schemes for JWT authentication
/why: - needed to specify how auth works (Bearer tokens) so Swagger UI can handle login/testing of protected endpoints
/how: - [securitySchemes] defines 'bearerAuth' as HTTP Bearer with JWT format, enabling "Authorize" button in UI
/how:- the [security] array applies bearerAuth globally, requiring tokens for all endpoints (overrideable per route)
/how:- this generates the complete OpenAPI specification JSON 

// swaggerDocs
*/ 
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Health check endpoint
app.get('/', (req, res) => red.send('Gig Buddy API is running'));

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
/*
/function: this converts the configuration and JSDoc comments into a machine-readable format Swagger UI can display
/how: ... [swaggerjsdoc] function takes the [swaggerOptions] and scans specified [apis] files - extracting JSdoc annotations to build a full API spec
/how: ... the result [swaggerDocs] is a JSON object ready to be served by the UI


 // - Mount Swagger UI at /api-docs




/function: mounts the swagger UI at /api-docs route
/why: provices web-based interface where devs and users can view AI documentation, see endpoint details, and test requests direcctly in browwser
/how: [swaggerUi.serve] handles HTTP requests to the /api-docs path, serving static files for the UI.
/how: ... [swaggerUI.setup(swaggerDocs)] initialises the UI with generated OpenAPI spec (swaggerDocs), rendering the docs with interactive elements, like 'try it out' buttons for each end point






 // =============================================================================
 // 5. API ENDPOINTS SECTION
 // =============================================================================
 // Mount API routes
 // Suggested endpoints to implement:
 //
 // AUTHENTICATION:
 // - POST /api/auth/register - Register new user
 // - POST /api/auth/login - User login
 // - GET  /api/auth/me - Get current user info (protected)
 // - POST /api/auth/logout - User logout
 //
 // GIGS (Public/Private):
 // - GET    /api/gigs - Get all gigs (public)
 // - GET    /api/gigs/:id - Get specific gig details (public)
 // - GET    /api/gigs/my - Get user's own gigs (private)
 // - POST   /api/gigs - Create new gig (private)
 // - PUT    /api/gigs/:id - Update gig (private)
 // - DELETE /api/gigs/:id - Delete gig (private)
 //
 // COLLECTIONS:
 // - GET    /api/collections - Get all collections (public)
 // - GET    /api/collections/my - Get user's collections (private)
 // - GET    /api/collections/:id - Get specific collection
 // - POST   /api/collections - Create new collection (private)
 // - PUT    /api/collections/:id - Update collection (private)
 // - DELETE /api/collections/:id - Delete collection (private)
 // - POST   /api/collections/:id/gigs/:gigId - Add gig to collection
 // - DELETE /api/collections/:id/gigs/:gigId - Remove gig from collection
 //
 // USERS:
 // - GET /api/users - Get all users (public)
 // - GET /api/users/:id - Get user details (public)
 // - GET /api/users/:id/gigs - Get user's gigs (public)
 // - GET /api/users/:id/collections - Get user's collections (public)
 //
 // Example: app.use('/api/auth', authRoutes);

 // =============================================================================
 // 6. ERROR HANDLING SECTION
 // =============================================================================
 // Add global error handling middleware
 // - Handle validation errors
 // - Handle database errors
 // - Return consistent error responses

 // =============================================================================
 // 7. SERVER STARTUP SECTION
 // =============================================================================
 // Start the server
 // - Test database connection
 // - app.listen(PORT, () => { ... });
 // - Handle graceful shutdown
 //


// Import database configuration

// Import route handlers

// Security middleware

// CORS configuration

// Request logging

// Body parsing middleware

// Rate limiting

// Health check endpoint
app
// API routes

// 404 handler for undefined API routes

// Global error handling middleware

  // Handle specific error types
  

   // PostgreSQL unique constraint violation
  
   // PostgreSQL foreign key violation
   

  // Return appropriate status code
 
// Server startup

    // Test database connection
   
    // Start server
    
// Handle unhandled promise rejections

// Handle uncaught exceptions

// Graceful shutdown


// Start the server
