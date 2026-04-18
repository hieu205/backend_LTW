const mongoose = require('mongoose');

// ============ SCHEMA INFO SCHEMA ============
// Định nghĩa cấu trúc dữ liệu SchemaInfo trong MongoDB
// Dùng để lưu thông tin về version của schema

const schemaInfoSchema = new mongoose.Schema({
    _id: Number,
    __v: Number,
    load_date_time: String
});

// ============ EXPORT MODEL ============
// Tạo model SchemaInfo từ schema
module.exports = mongoose.model('SchemaInfo', schemaInfoSchema);
