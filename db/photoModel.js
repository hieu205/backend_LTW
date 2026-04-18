const mongoose = require('mongoose');

// ============ COMMENT SCHEMA ============
// Schema cho các bình luận trên ảnh
const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    photo_id: String,
    user_id: String,
    user: {
        _id: String,
        first_name: String,
        last_name: String
    },
    date_time: Date,
    comment: String
});

// ============ PHOTO SCHEMA ============
// Định nghĩa cấu trúc dữ liệu Photo trong MongoDB
const photoSchema = new mongoose.Schema({
    _id: String,                        // ID của photo
    user_id: {
        type: String,
        required: true
    },
    date_time: {
        type: Date,
        required: true
    },
    file_name: {
        type: String,
        required: true
    },
    comments: [commentSchema]           // Array của comments
});

// ============ EXPORT MODEL ============
// Tạo model Photo từ schema
module.exports = mongoose.model('Photo', photoSchema);
