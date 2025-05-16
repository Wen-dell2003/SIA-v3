const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const sampleBooks = [
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    description: "A powerful primer on how design serves as the interface between objects and users.",
    price: 599.99,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    category: "Technology",
    stock: 15,
    isbn: "978-0465050659"
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "A handbook of agile software craftsmanship.",
    price: 799.99,
    imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498",
    category: "Technology",
    stock: 10,
    isbn: "978-0132350884"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    description: "A stunning blend of adventure and mysticism.",
    price: 499.99,
    imageUrl: "https://unsplash.com/photos/a-book-sitting-on-top-of-a-bed-next-to-a-pillow-NkHy7lrVB2g",
    category: "Fiction",
    stock: 20,
    isbn: "978-0441172719"
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
    description: "An ancient Chinese military treatise.",
    price: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1519682577862-22b62b24e493",
    category: "History",
    stock: 8,
    isbn: "978-0140439199"
  },
  {
    title: "The Creative Act",
    author: "Rick Rubin",
    description: "A profound exploration of creativity and the creative process.",
    price: 699.99,
    imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
    category: "Arts",
    stock: 12,
    isbn: "978-0593652886"
  },
  {
    title: "Brief Answers to the Big Questions",
    author: "Stephen Hawking",
    description: "Hawking explores the universes biggest questions.",
    price: 549.99,
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
    category: "Science",
    stock: 15,
    isbn: "978-1984819192"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Book.deleteMany({});
    console.log('Cleared existing books');

    const books = await Book.insertMany(sampleBooks);
    console.log(`Added ${books.length} books to the database`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
