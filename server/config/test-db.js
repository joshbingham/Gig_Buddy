const { testConnection} = require('./database');

testConnection().then(success => {
    console.log('Database test:', success ? 'Success' : 'Failed');
    process.exit(success ? 0 : 1);
});