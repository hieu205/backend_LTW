const mongoose = require('mongoose');

// ============ USER SCHEMA ============
// Định nghĩa cấu trúc dữ liệu User trong MongoDB

const userSchema = new mongoose.Schema({
    _id: String,                    // ID của user
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    email: {
        type: String,
        sparse: true
    },
    password: {
        type: String,
        sparse: true
    }
});

// ============ EXPORT MODEL ============
// Tạo model User từ schema
module.exports = mongoose.model('User', userSchema);
