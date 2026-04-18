require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./userModel');
const Photo = require('./photoModel');
const SchemaInfo = require('./schemaInfo');

// ============ DỮ LIỆU TỪ modelData.js ============
// Dữ liệu người dùng
const users = [
    {
        _id: '1',
        first_name: 'Nguyễn',
        last_name: 'An',
        location: 'Hà Nội',
        description: 'Photography enthusiast',
        occupation: 'Software Engineer',
        email: 'nguyen.an@example.com',
        password: '123456'
    },
    {
        _id: '2',
        first_name: 'Trần',
        last_name: 'Bình',
        location: 'TPHCM',
        description: 'Travel lover',
        occupation: 'Designer',
        email: 'tran.binh@example.com',
        password: '123456'
    },
    {
        _id: '3',
        first_name: 'Phạm',
        last_name: 'Chi',
        location: 'Đà Nẵng',
        description: 'Nature photographer',
        occupation: 'Student',
        email: 'pham.chi@example.com',
        password: '123456'
    }
];

// Dữ liệu ảnh (khoảng 11 ảnh với comments)
const photos = [
    {
        _id: '101',
        user_id: '1',
        date_time: new Date('2024-01-15T10:30:00'),
        file_name: 'z7690624338396_4acff7cbb7f72ce1eca5d8c441188c72.jpg',
        comments: [
            {
                _id: new mongoose.Types.ObjectId(),
                photo_id: '101',
                user_id: '2',
                user: { _id: '2', first_name: 'Trần', last_name: 'Bình' },
                date_time: new Date('2024-01-15T11:00:00'),
                comment: 'Beautiful shot!'
            },
            {
                _id: new mongoose.Types.ObjectId(),
                photo_id: '101',
                user_id: '3',
                user: { _id: '3', first_name: 'Phạm', last_name: 'Chi' },
                date_time: new Date('2024-01-15T12:00:00'),
                comment: 'Love the colors'
            }
        ]
    },
    {
        _id: '102',
        user_id: '1',
        date_time: new Date('2024-01-20T14:45:00'),
        file_name: 'z7690629689803_18dfb8ec04c67e617da9f5d01be9b2ee.jpg',
        comments: [
            {
                _id: new mongoose.Types.ObjectId(),
                photo_id: '102',
                user_id: '3',
                user: { _id: '3', first_name: 'Phạm', last_name: 'Chi' },
                date_time: new Date('2024-01-20T15:30:00'),
                comment: 'Amazing view'
            }
        ]
    },
    {
        _id: '103',
        user_id: '1',
        date_time: new Date('2024-01-25T16:00:00'),
        file_name: 'z7690629695420_632adc5dadd10c0c3a0c124c66a4b577.jpg',
        comments: [
            {
                _id: new mongoose.Types.ObjectId(),
                photo_id: '103',
                user_id: '2',
                user: { _id: '2', first_name: 'Trần', last_name: 'Bình' },
                date_time: new Date('2024-01-25T17:00:00'),
                comment: 'Wonderful landscape!'
            }
        ]
    },
    {
        _id: '201',
        user_id: '2',
        date_time: new Date('2024-02-05T09:15:00'),
        file_name: 'z7690629706881_319d75035c5e1a29dcc6709ce80bdad7.jpg',
        comments: [
            {
                _id: new mongoose.Types.ObjectId(),
                photo_id: '201',
                user_id: '1',
                user: { _id: '1', first_name: 'Nguyễn', last_name: 'An' },
                date_time: new Date('2024-02-05T10:00:00'),
                comment: 'Great design'
            }
        ]
    },
    {
        _id: '202',
        user_id: '2',
        date_time: new Date('2024-02-10T14:20:00'),
        file_name: 'z7690629709827_2a78e43c5f2b7291d98d7c90b6ef2cc2.jpg',
        comments: [
            {
                _id: new mongoose.Types.ObjectId(),
                photo_id: '202',
                user_id: '3',
                user: { _id: '3', first_name: 'Phạm', last_name: 'Chi' },
                date_time: new Date('2024-02-10T15:00:00'),
                comment: 'Stunning colors!'
            }
        ]
    },
    {
        _id: '203',
        user_id: '2',
        date_time: new Date('2024-02-15T10:30:00'),
        file_name: 'z7690629717918_5952dbfb1ce0e4aef65f7aee0f128d06.jpg',
        comments: []
    },
    {
        _id: '301',
        user_id: '3',
        date_time: new Date('2024-02-20T16:20:00'),
        file_name: 'z7690629719163_0ed824ddc421739be9c168f01eab0344.jpg',
        comments: [
            {
                _id: new mongoose.Types.ObjectId(),
                photo_id: '301',
                user_id: '1',
                user: { _id: '1', first_name: 'Nguyễn', last_name: 'An' },
                date_time: new Date('2024-02-20T17:00:00'),
                comment: 'Nature at its best!'
            }
        ]
    },
    {
        _id: '302',
        user_id: '3',
        date_time: new Date('2024-02-25T12:00:00'),
        file_name: 'z7690629725424_e6dde6c8837d63f3248dc570c9999e98.jpg',
        comments: [
            {
                _id: new mongoose.Types.ObjectId(),
                photo_id: '302',
                user_id: '2',
                user: { _id: '2', first_name: 'Trần', last_name: 'Bình' },
                date_time: new Date('2024-02-25T13:00:00'),
                comment: 'Perfect capture!'
            }
        ]
    },
    {
        _id: '104',
        user_id: '1',
        date_time: new Date('2024-03-01T13:45:00'),
        file_name: '391448203_317005497600467_5379599419520756808_n.jpg',
        comments: [
            {
                _id: new mongoose.Types.ObjectId(),
                photo_id: '104',
                user_id: '2',
                user: { _id: '2', first_name: 'Trần', last_name: 'Bình' },
                date_time: new Date('2024-03-01T14:00:00'),
                comment: 'Awesome shot!'
            }
        ]
    },
    {
        _id: '204',
        user_id: '2',
        date_time: new Date('2024-03-05T15:30:00'),
        file_name: '391546676_1474394810083074_4399402809588689087_n.jpg',
        comments: [
            {
                _id: new mongoose.Types.ObjectId(),
                photo_id: '204',
                user_id: '3',
                user: { _id: '3', first_name: 'Phạm', last_name: 'Chi' },
                date_time: new Date('2024-03-05T16:00:00'),
                comment: 'Incredible view!'
            }
        ]
    },
    {
        _id: '303',
        user_id: '3',
        date_time: new Date('2024-03-10T11:20:00'),
        file_name: '392755258_1474329076756314_1079558485968910719_n.jpg',
        comments: [
            {
                _id: new mongoose.Types.ObjectId(),
                photo_id: '303',
                user_id: '1',
                user: { _id: '1', first_name: 'Nguyễn', last_name: 'An' },
                date_time: new Date('2024-03-10T12:00:00'),
                comment: 'Beautiful moment captured!'
            }
        ]
    }
];

// ============ LOAD DATABASE ============
async function loadDatabase() {
    try {
        // Connect tới MongoDB
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(process.env.DB_URL);
        console.log('✅ Connected to MongoDB');

        // Xóa collections cũ
        console.log('🗑️  Clearing old data...');
        await User.deleteMany({});
        await Photo.deleteMany({});
        await SchemaInfo.deleteMany({});
        console.log('✅ Old data cleared');

        // Insert users
        console.log('👥 Loading users...');
        await User.insertMany(users);
        console.log(`✅ Loaded ${users.length} users`);

        // Insert photos
        console.log('📸 Loading photos...');
        await Photo.insertMany(photos);
        console.log(`✅ Loaded ${photos.length} photos`);

        // Insert schema info
        console.log('📊 Loading schema info...');
        const schemaInfo = {
            _id: 1,
            __v: 0,
            load_date_time: new Date().toISOString()
        };
        await SchemaInfo.create(schemaInfo);
        console.log('✅ Schema info loaded');

        console.log('\n✨ Database loaded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error loading database:', error.message);
        process.exit(1);
    }
}

