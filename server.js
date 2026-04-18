// Nhập các module cần thiết
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./db/userModel');
const Photo = require('./db/photoModel');
const SchemaInfo = require('./db/schemaInfo');

// Tạo ứng dụng Express
const app = express();
const PORT = process.env.PORT || 5000;

// ============ MIDDLEWARE ============

// Cho phép CORS - frontend có thể gọi API từ http://localhost:3000
app.use(cors());

// Parse JSON từ request body
app.use(express.json());

// ============ LOGGING MIDDLEWARE ============
// Log tất cả requests
app.use((req, res, next) => {
    const timestamp = new Date().toLocaleTimeString('vi-VN');
    console.log(`\n[${timestamp}] ${req.method} ${req.path}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('   Body:', JSON.stringify(req.body));
    }
    next();
});

// Phục vụ các file tĩnh (ảnh) từ thư mục 'images'
// URL: http://localhost:5000/images/[tên file]
app.use('/images', express.static('images'));

// ============ MONGODB CONNECTION ============
// Connect tới MongoDB Atlas
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// ============ API ENDPOINTS ============

// 1. GET /test/info - Lấy thông tin schema
app.get('/test/info', async (req, res) => {
    try {
        console.log('   Fetching schema info...');
        const info = await SchemaInfo.findOne({ _id: 1 });
        if (info) {
            console.log('   Schema info found:', info._id);
            res.json(info);
        } else {
            console.log('   Schema info not found');
            res.status(404).json({ error: 'Schema info not found' });
        }
    } catch (error) {
        console.error('   Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 1.5 GET /stats - Lấy thống kê tổng quan
app.get('/stats', async (req, res) => {
    try {
        console.log('   Fetching statistics...');
        const usersCount = await User.countDocuments();
        const photosCount = await Photo.countDocuments();

        // Count total comments từ tất cả photos
        const photosWithComments = await Photo.find().select('comments');
        const commentsCount = photosWithComments.reduce((total, photo) => {
            return total + (photo.comments ? photo.comments.length : 0);
        }, 0);

        console.log(`   Stats: ${usersCount} users, ${photosCount} photos, ${commentsCount} comments`);
        res.json({
            users: usersCount,
            photos: photosCount,
            comments: commentsCount
        });
    } catch (error) {
        console.error('   Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 2. GET /user/list - Lấy danh sách tất cả người dùng
// Return chỉ: _id, first_name, last_name
app.get('/user/list', async (req, res) => {
    try {
        console.log('   Fetching all users...');
        const users = await User.find().select('_id first_name last_name');
        console.log(`   Found ${users.length} users`);
        res.json(users);
    } catch (error) {
        console.error('   Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 3. GET /user/:id - Lấy thông tin một người dùng cụ thể
app.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(`   Fetching user: ${userId}`);

        // Validate ID
        if (!userId) {
            console.log('   User ID is required');
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await User.findById(userId);
        if (user) {
            console.log(`   User found: ${user.first_name} ${user.last_name}`);
            res.json(user);
        } else {
            console.log(`   User not found: ${userId}`);
            res.status(400).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('   Error:', error.message);
        res.status(400).json({ error: 'Invalid user ID format' });
    }
});

// 4. GET /photosOfUser/:id - Lấy tất cả ảnh của một user
app.get('/photosOfUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(`   Fetching photos for user: ${userId}`);

        // Kiểm tra user tồn tại
        const user = await User.findById(userId);
        if (!user) {
            console.log(`   ❌ User not found: ${userId}`);
            return res.status(400).json({ error: 'User not found' });
        }
        console.log(`   ✅ User found: ${user.first_name} ${user.last_name}`);

        // Lấy ảnh của user
        const photos = await Photo.find({ user_id: userId });
        console.log(`   📷 Found ${photos.length} photos`);

        // Transform ảnh: chỉ lấy fields cần thiết
        const transformedPhotos = photos.map(photo => {
            const photoObj = photo.toObject();
            // Transform comments
            if (photoObj.comments) {
                photoObj.comments = photoObj.comments.map(comment => ({
                    _id: comment._id,
                    photo_id: comment.photo_id,
                    date_time: comment.date_time,
                    comment: comment.comment,
                    user: {
                        _id: comment.user._id,
                        first_name: comment.user.first_name,
                        last_name: comment.user.last_name
                    }
                }));
            }
            return photoObj;
        });

        console.log(`   Transformed ${transformedPhotos.length} photos with comments`);
        res.json(transformedPhotos);
    } catch (error) {
        console.error('   Error:', error.message);
        res.status(400).json({ error: 'Invalid user ID format' });
    }
});

// 5. POST /photos/:photoId/comments - Thêm comment vào ảnh (EXTRA FEATURE)
app.post('/photos/:photoId/comments', async (req, res) => {
    try {
        const { photoId } = req.params;
        const { user_name, comment_text } = req.body;

        console.log(`   💬 Adding comment to photo: ${photoId}`);
        console.log(`      By: ${user_name}`);

        // Validate input
        if (!photoId || !user_name || !comment_text) {
            console.log('   ❌ Missing required fields');
            return res.status(400).json({
                error: 'Missing required fields: photoId, user_name, comment_text'
            });
        }

        // Find photo
        const photo = await Photo.findById(photoId);
        if (!photo) {
            console.log(`   Photo not found: ${photoId}`);
            return res.status(400).json({ error: 'Photo not found' });
        }
        console.log(`   Photo found: ${photoId}`);

        // Parse user name (expect format: "FirstName LastName")
        const nameParts = user_name.split(' ');
        const firstName = nameParts[0] || 'Unknown';
        const lastName = nameParts[1] || '';

        // Create new comment
        const newComment = {
            _id: new mongoose.Types.ObjectId(),
            photo_id: photoId,
            user_id: 'anonymous',
            user: {
                _id: 'anonymous',
                first_name: firstName,
                last_name: lastName
            },
            date_time: new Date(),
            comment: comment_text
        };

        // Add comment to photo
        photo.comments.push(newComment);
        await photo.save();

        console.log(`   Comment added successfully`);
        console.log(`   Total comments on photo: ${photo.comments.length}`);

        res.status(201).json(newComment);
    } catch (error) {
        console.error('   ❌ Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// ============ AUTH ENDPOINTS ============

// 6. POST /auth/login - Đăng nhập (kiểm tra từ DB)
app.post('/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log(`   Login: ${username}`);

        if (!username || !password) {
            console.log('   Error: Missing username or password');
            return res.status(400).json({ error: 'Username and password required' });
        }

        // Tìm user theo username (hoặc email, hoặc id)
        let user = await User.findOne({
            $or: [
                { _id: username },
                { email: username.toLowerCase() }
            ]
        });

        if (!user) {
            console.log(`   Error: User not found: ${username}`);
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Check password (simple check)
        if (user.password !== password) {
            console.log('   Error: Wrong password');
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        console.log(`   Success: ${user.first_name} ${user.last_name}`);

        res.json({
            id: user._id,
            username: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            location: user.location,
            occupation: user.occupation
        });
    } catch (error) {
        console.error('   Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 7. POST /auth/register - Đăng kí (lưu vào DB)
app.post('/auth/register', async (req, res) => {
    try {
        const { username, password, first_name, last_name, location, occupation } = req.body;

        console.log(`   Register: ${username}`);

        // Validate required fields
        if (!username || !password || !first_name || !last_name) {
            console.log('   Error: Missing required fields');
            return res.status(400).json({ error: 'Username, password, first_name, last_name are required' });
        }

        // Check if user already exists
        const existingUser = await User.findById(username);
        if (existingUser) {
            console.log('   Error: Username already exists');
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create new user
        const newUser = {
            _id: username,
            password: password,
            first_name: first_name,
            last_name: last_name,
            location: location || '',
            occupation: occupation || '',
            description: 'New user'
        };

        const user = await User.create(newUser);
        console.log(`   Success: User created: ${user._id}`);

        res.status(201).json({
            id: user._id,
            username: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            location: user.location,
            occupation: user.occupation
        });
    } catch (error) {
        console.error('   Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 8. GET /auth/user/:id - Lấy thông tin user từ Auth
app.get('/auth/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(`   👤 Fetching user: ${userId}`);

        const user = await User.findById(userId);
        if (user) {
            console.log(`   ✅ User found: ${user.first_name} ${user.last_name}`);
            res.json({
                id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                location: user.location,
                occupation: user.occupation
            });
        } else {
            console.log(`   ❌ User not found: ${userId}`);
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('   ❌ Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// ============ KHỞI ĐỘNG SERVER ============

app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 PHOTO SHARING APP - BACKEND SERVER');
    console.log('='.repeat(60));
    console.log(`📌 Server running at: http://localhost:${PORT}`);
    console.log(`📊 Database: LTW (MongoDB Atlas)`);
    console.log('='.repeat(60));
    console.log('\n📝 Available Endpoints:');
    console.log(`   GET  http://localhost:${PORT}/test/info           - Schema info`);
    console.log(`   GET  http://localhost:${PORT}/user/list           - All users`);
    console.log(`   GET  http://localhost:${PORT}/user/:id            - User detail`);
    console.log(`   GET  http://localhost:${PORT}/photosOfUser/:id    - User photos + comments`);
    console.log(`   POST http://localhost:${PORT}/photos/:id/comments - Add comment`);
    console.log(`   POST http://localhost:${PORT}/auth/register       - Register new user`);
    console.log(`   POST http://localhost:${PORT}/auth/login          - Login user`);
    console.log(`   GET  http://localhost:${PORT}/auth/user/:id       - Get auth user`);
    console.log('='.repeat(60) + '\n');
});
