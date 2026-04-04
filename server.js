// Nhập các module cần thiết
const express = require('express');  // Framework web
const cors = require('cors');        // Cho phép truy cập từ domain khác
const modelData = require('./modelData');  // Dữ liệu người dùng và ảnh

// Tạo ứng dụng Express
const app = express();
const PORT = 5000;  // Cổng chạy server

// ============ MIDDLEWARE ============

// Cho phép CORS - frontend có thể gọi API từ http://localhost:3000
app.use(cors());

// Parse JSON từ request body
app.use(express.json());

// Phục vụ các file tĩnh (ảnh) từ thư mục 'images'
// URL: http://localhost:5000/images/[tên file]
app.use('/images', express.static('images'));

// ============ API ENDPOINTS ============

// 1. GET /test/info - Lấy thông tin schema
// Trả về thông tin cơ bản về dữ liệu
app.get('/test/info', (req, res) => {
    res.json(modelData.schemaInfo());
});

// 2. GET /user/list - Lấy danh sách tất cả người dùng
// Trả về mảng chứa tất cả user
app.get('/user/list', (req, res) => {
    res.json(modelData.userListModel());
});

// 3. GET /user/:id - Lấy thông tin một người dùng cụ thể
// :id là tham số trong URL, ví dụ: /user/1
app.get('/user/:id', (req, res) => {
    const user = modelData.userModel(req.params.id);
    if (user) {
        res.json(user);  // Trả về user nếu tìm thấy
    } else {
        res.status(404).json({ error: 'User not found' });  // Lỗi 404 nếu không tìm thấy
    }
});

// 4. GET /photosOfUser/:id - Lấy tất cả ảnh của một user
// :id là ID của user, ví dụ: /photosOfUser/1
app.get('/photosOfUser/:id', (req, res) => {
    const photos = modelData.photoOfUserModel(req.params.id);
    res.json(photos);  // Trả về mảng ảnh của user
});

// ============ KHỞI ĐỘNG SERVER ============

// Lắng nghe trên cổng PORT
// Khi có request đến, Express sẽ xử lý theo route tương ứng
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📝 Test: http://localhost:${PORT}/test/info`);
    console.log(`👥 Danh sách user: http://localhost:${PORT}/user/list`);
});
