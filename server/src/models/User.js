const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Method to check password (plain text comparison)
userSchema.methods.comparePassword = async function(candidatePassword) {
  return this.password === candidatePassword;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
