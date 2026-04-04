# Hướng Dẫn Thêm Ảnh vào Backend

## 📁 Cấu Trúc Thư Mục

```
backend/
├── images/
│   ├── photo1.jpg       ← Thêm ảnh ở đây
│   ├── photo2.jpg
│   ├── photo3.jpg
│   └── photo4.jpg
├── server.js
├── modelData.js
└── package.json
```

## 🖼️ Cách Thêm Ảnh

### Cách 1: Download ảnh từ Internet

1. **Tìm ảnh trên Google Images hoặc Unsplash**
   - Truy cập: https://unsplash.com
   - Tìm ảnh bạn thích
   - Click "Download" → chọn kích thước phù hợp (1600x900 hoặc 1200x800)

2. **Lưu ảnh vào thư mục `backend/images/`**
   - Đặt tên: `photo1.jpg`, `photo2.jpg`, v.v.
   - **Quan trọng**: Dùng định dạng `.jpg` hoặc `.png`

### Cách 2: Dùng ảnh từ máy của bạn

1. Chọn ảnh có kích thước 600-1600x300-900px
2. Copy vào thư mục: `c:\Users\Dell\Desktop\LTW\backend\images\`
3. Đặt tên: `photo1.jpg`, `photo2.jpg`, etc

### Cách 3: Tạo ảnh test (nếu không có)

Bạn có thể dùng colorized placeholder online:
- https://via.placeholder.com/ — Đã cài sẵn trong code (nếu không có ảnh thực)

## 📝 Cập Nhật Tên Ảnh

Nếu bạn thay đổi tên ảnh, phải cập nhật trong `backend/modelData.js`:

```javascript
const photos = [
    {
        _id: '101',
        user_id: '1',
        file_name: 'photo1.jpg',          // ← Tên file thực tế
        image_url: `${BASE_URL}/images/photo1.jpg`,  // URL tự động generate
        // ...
    }
];
```

## 🔗 Kiểm Tra URL

Khi backend chạy, bạn có thể test URL trực tiếp:
- `http://localhost:5000/images/photo1.jpg`
- `http://localhost:5000/images/photo2.jpg`

## ✅ Danh Sách Ảnh Hiện Tại

- `photo1.jpg` - User 1 (Nguyễn An)
- `photo2.jpg` - User 1 (Nguyễn An)
- `photo3.jpg` - User 2 (Trần Bình)
- `photo4.jpg` - User 3 (Phạm Chi)

## 🚀 Chạy Thử

1. **Thêm ảnh vào `backend/images/`**
2. **Khởi động backend**: `npm start` (port 5000)
3. **Khởi động frontend**: `npm start` (port 3000)
4. **Vào Users → View Photos** → Sẽ thấy ảnh!

## 📌 Lưu Ý Quan Trọng

- ✅ Ảnh phải ở **thư mục `images`** trong backend
- ✅ Tên ảnh trong thư mục phải **match** với `file_name` trong `modelData.js`
- ✅ Backend phải **đang chạy** để phục vụ ảnh
- ✅ Frontend sẽ fetch từ `http://localhost:5000/images/...`

## 🎨 Kích Thước Ảnh Recommended

- **Chiều rộng**: 600-1600px
- **Chiều cao**: 300-900px
- **Tỷ lệ**: 16:9 hoặc 4:3 (landscape)
- **Dung lượng**: < 500KB (để load nhanh)

## 💡 Mẹo

- Nếu ảnh load chậm, dùng công cụ nén ảnh online (tinyjpg.com)
- Nếu ảnh không hiển thị, check browser console (F12) xem lỗi gì
- Test URL ảnh trực tiếp trong browser address bar
