const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'], // Lejon vetëm këto vlera
    default: 'user' // Nëse nuk vendoset, ruhet si user
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
