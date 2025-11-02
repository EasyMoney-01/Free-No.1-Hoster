const mongoose = require('mongoose');
require('dotenv').config();

// Test MongoDB connection
const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
    
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is not set in environment variables');
      process.exit(1);
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✓ Database: ${conn.connection.name}`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('✓ Connection test completed successfully');
    
  } catch (error) {
    console.error('✗ Connection test failed:', error.message);
    process.exit(1);
  }
};

testConnection();