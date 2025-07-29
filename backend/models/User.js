const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true }, // Only required for Google users
    email: String,
    name: String,
    picture: String,
    isGuest: { type: Boolean, default: false },
    creditsUsed: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
