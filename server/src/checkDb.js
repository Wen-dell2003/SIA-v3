const mongoose = require('mongoose');
require('dotenv').config();

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all collections
    const collections = await mongoose.connection.db.collections();
    console.log('\nCollections in database:');
    for (let collection of collections) {
      console.log(`\nCollection: ${collection.collectionName}`);
      const documents = await collection.find({}).toArray();
      console.log('Documents:', JSON.stringify(documents, null, 2));
    }

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error:', error);
  }
};

checkDatabase();
