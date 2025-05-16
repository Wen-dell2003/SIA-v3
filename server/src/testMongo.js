const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('Connection URI:', process.env.MONGODB_URI);
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Successfully connected to MongoDB!');
        
        // Test creating a collection
        const testCollection = mongoose.connection.collection('test');
        await testCollection.insertOne({ test: 'data', timestamp: new Date() });
        console.log('Successfully inserted test document');
        
        // Read the document back
        const doc = await testCollection.findOne({ test: 'data' });
        console.log('Retrieved test document:', doc);
        
        // Clean up
        await testCollection.deleteMany({ test: 'data' });
        console.log('Cleaned up test data');
        
        await mongoose.connection.close();
        console.log('Connection closed successfully');
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

testConnection();
