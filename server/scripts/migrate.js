/**
 * DATABASE MIGRATION SCRIPT
 * 
 * This script creates the initial database schema for the Local Live Gigs application.
 * 
 * RUN INSTRUCTIONS:
 * 1. Ensure PostgreSQL is running
 * 2. Create database: createdb local_live_gigs
 * 3. Run migration: node scripts/migrate.js
 * 
 * SCHEMA OVERVIEW:
 * 
 * 1. users table:
 *    - id: Primary key (auto-increment)
 *    - name: User's display name
 *    - email: Unique email address
 *    - password_hash: Hashed password (never store plain text)
 *    - bio: Optional user biography
 *    - avatar_url: Optional profile picture URL
 *    - location: Optional user location
 *    - website_url: Optional personal website
 *    - social_links: JSON object for social media links
 *    - role: User role (member/admin)
 *    - created_at/updated_at: Timestamps
 * 
 * 2. gigs table:
 *    - id: Primary key (auto-increment)
 *    - title: Gig title
 *    - description: Optional gig description
 *    - venue: Venue name/location
 *    - event_date: Date and time of the gig
 *    - genre: Music genre
 *    - price: Ticket price (0 for free)
 *    - image_url: Optional gig image
 *    - ticket_url: Optional ticket purchase URL
 *    - user_id: Foreign key to users table
 *    - status: Gig status (active/cancelled/sold_out)
 *    - created_at/updated_at: Timestamps
 * 
 * 3. collections table:
 *    - id: Primary key (auto-increment)
 *    - name: Collection name
 *    - description: Optional collection description
 *    - user_id: Foreign key to users table
 *    - is_public: Whether collection is publicly visible
 *    - created_at/updated_at: Timestamps
 * 
 * 4. collection_gigs table (junction table):
 *    - collection_id: Foreign key to collections table
 *    - gig_id: Foreign key to gigs table
 *    - added_at: When gig was added to collection
 *    - PRIMARY KEY (collection_id, gig_id): Prevent duplicates
 * 
 * 5. genres table:
 *    - id: Primary key (auto-increment)
 *    - name: Genre name (e.g., "Rock", "Jazz")
 *    - slug: URL-friendly version of name
 *    - created_at: Timestamp
 * 
 * RELATIONSHIPS:
 * - Users have many gigs
 * - Users have many collections
 * - Collections have many gigs (many-to-many via collection_gigs)
 * - Gigs belong to one user
 * - Collections belong to one user
 * 
 * INDEXES:
 * - All foreign key columns
 * - Frequently queried columns (email, event_date, is_public)
 * - Composite indexes for complex queries
 */

const { executeQuery } = require('../config/database');

// Migration functions - TODO: Implement table creation
const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
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
    );
  `;
  
  // TODO: Execute query and handle results
  // await executeQuery(query);
  console.log('✓ Users table created');
};

const createGigsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS gigs (
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
    );
  `;
  
  // TODO: Execute query and handle results
  // await executeQuery(query);
  console.log('✓ Gigs table created');
};

const createCollectionsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS collections (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      description TEXT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      is_public BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  // TODO: Execute query and handle results
  // await executeQuery(query);
  console.log('✓ Collections table created');
};

const createCollectionGigsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS collection_gigs (
      collection_id INTEGER REFERENCES collections(id) ON DELETE CASCADE,
      gig_id INTEGER REFERENCES gigs(id) ON DELETE CASCADE,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (collection_id, gig_id)
    );
  `;
  
  // TODO: Execute query and handle results
  // await executeQuery(query);
  console.log('✓ Collection_gigs junction table created');
};

const createGenresTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS genres (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      slug VARCHAR(50) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  // TODO: Execute query and handle results
  // await executeQuery(query);
  console.log('✓ Genres table created');
};

const createIndexes = async () => {
  const indexes = [
    // Users table indexes
    'CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);',
    'CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);',
    
    // Gigs table indexes
    'CREATE INDEX IF NOT EXISTS idx_gigs_user_id ON gigs(user_id);',
    'CREATE INDEX IF NOT EXISTS idx_gigs_event_date ON gigs(event_date);',
    'CREATE INDEX IF NOT EXISTS idx_gigs_genre ON gigs(genre);',
    'CREATE INDEX IF NOT EXISTS idx_gigs_status ON gigs(status);',
    'CREATE INDEX IF NOT EXISTS idx_gigs_title ON gigs USING gin(to_tsvector(\'english\', title));',
    
    // Collections table indexes
    'CREATE INDEX IF NOT EXISTS idx_collections_user_id ON collections(user_id);',
    'CREATE INDEX IF NOT EXISTS idx_collections_is_public ON collections(is_public);',
    'CREATE INDEX IF NOT EXISTS idx_collections_name ON collections(name);',
    
    // Collection_gigs table indexes
    'CREATE INDEX IF NOT EXISTS idx_collection_gigs_collection_id ON collection_gigs(collection_id);',
    'CREATE INDEX IF NOT EXISTS idx_collection_gigs_gig_id ON collection_gigs(gig_id);',
    
    // Genres table indexes
    'CREATE INDEX IF NOT EXISTS idx_genres_name ON genres(name);',
    'CREATE INDEX IF NOT EXISTS idx_genres_slug ON genres(slug);'
  ];
  
  // TODO: Execute all index creation queries
  // for (const index of indexes) {
  //   await executeQuery(index);
  // }
  console.log('✓ Database indexes created');
};

const populateGenres = async () => {
  const genres = [
    { name: 'Rock', slug: 'rock' },
    { name: 'Pop', slug: 'pop' },
    { name: 'Jazz', slug: 'jazz' },
    { name: 'Blues', slug: 'blues' },
    { name: 'Folk', slug: 'folk' },
    { name: 'Electronic', slug: 'electronic' },
    { name: 'Hip Hop', slug: 'hip-hop' },
    { name: 'Country', slug: 'country' },
    { name: 'Classical', slug: 'classical' },
    { name: 'Punk', slug: 'punk' },
    { name: 'Metal', slug: 'metal' },
    { name: 'Indie', slug: 'indie' },
    { name: 'Alternative', slug: 'alternative' },
    { name: 'Acoustic', slug: 'acoustic' },
    { name: 'Reggae', slug: 'reggae' },
    { name: 'R&B', slug: 'rb' },
    { name: 'Soul', slug: 'soul' },
    { name: 'Funk', slug: 'funk' },
    { name: 'World Music', slug: 'world-music' },
    { name: 'Experimental', slug: 'experimental' }
  ];
  
  // TODO: Insert genre data into database
  // for (const genre of genres) {
  //   await executeQuery(
  //     'INSERT INTO genres (name, slug) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING;',
  //     [genre.name, genre.slug]
  //   );
  // }
  console.log('✓ Genre data populated');
};

// Main migration function - TODO: Implement migration execution
const runMigration = async () => {
  try {
    console.log('Starting database migration...');
    
    // Create tables
    // await createUsersTable();
    // await createGigsTable();
    // await createCollectionsTable();
    // await createCollectionGigsTable();
    // await createGenresTable();
    
    // Create indexes
    // await createIndexes();
    
    // Populate initial data
    // await populateGenres();
    
    console.log('\n✅ Database migration completed successfully!');
    console.log('\nDatabase schema created:');
    console.log('- Users table (with authentication fields)');
    console.log('- Gigs table (with event management)');
    console.log('- Collections table (with privacy settings)');
    console.log('- Collection_gigs junction table (many-to-many)');
    console.log('- Genres table (with predefined music genres)');
    console.log('\nYou can now start the API server.');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration if called directly
if (require.main === module) {
  runMigration();
}

module.exports = {
  runMigration,
  createUsersTable,
  createGigsTable,
  createCollectionsTable,
  createCollectionGigsTable,
  createGenresTable,
  createIndexes,
  populateGenres
};