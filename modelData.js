// ============ DỮ LIỆU MÔ HÌNH ============
// File này chứa tất cả dữ liệu người dùng và ảnh
// Dữ liệu được lưu trong bộ nhớ (in-memory), không dùng database

// Base URL để tạo đường dẫn ảnh
const BASE_URL = 'http://localhost:5000';

// ============ DANH SÁCH NGƯỜI DÙNG ============
// Mảng chứa 3 người dùng với thông tin cơ bản
const users = [
    {
        _id: '1',
        first_name: 'Nguyễn',
        last_name: 'An',
        location: 'Hà Nội',
        description: 'Photography enthusiast',
        occupation: 'Software Engineer'
    },
    {
        _id: '2',
        first_name: 'Trần',
        last_name: 'Bình',
        location: 'TPHCM',
        description: 'Travel lover',
        occupation: 'Designer'
    },
    {
        _id: '3',
        first_name: 'Phạm',
        last_name: 'Chi',
        location: 'Đà Nẵng',
        description: 'Nature photographer',
        occupation: 'Student'
    }
];

// ============ DANH SÁCH ẢNH ============
// Mảng chứa ảnh của các người dùng
// Mỗi ảnh có:
// - _id: ID duy nhất của ảnh
// - user_id: ID của user sở hữu ảnh
// - date_time: Thời gian đăng ảnh
// - image_url: Đường dẫn ảnh để hiển thị trên web
// - comments: Mảng bình luận của người khác

const photos = [
    // ============ User 1 (Nguyễn An) - 4 ảnh ============
    {
        _id: '101',
        user_id: '1',
        date_time: new Date('2024-01-15T10:30:00'),
        file_name: 'z7690624338396_4acff7cbb7f72ce1eca5d8c441188c72.jpg',
        image_url: `${BASE_URL}/images/z7690624338396_4acff7cbb7f72ce1eca5d8c441188c72.jpg`,
        comments: [
            {
                _id: 'c1',
                photo_id: '101',
                user_id: '2',
                user: users[1],
                date_time: new Date('2024-01-15T11:00:00'),
                comment: 'Beautiful shot!'
            },
            {
                _id: 'c2',
                photo_id: '101',
                user_id: '3',
                user: users[2],
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
        image_url: `${BASE_URL}/images/z7690629689803_18dfb8ec04c67e617da9f5d01be9b2ee.jpg`,
        comments: [
            {
                _id: 'c3',
                photo_id: '102',
                user_id: '3',
                user: users[2],
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
        image_url: `${BASE_URL}/images/z7690629695420_632adc5dadd10c0c3a0c124c66a4b577.jpg`,
        comments: [
            {
                _id: 'c5',
                photo_id: '103',
                user_id: '2',
                user: users[1],
                date_time: new Date('2024-01-25T17:00:00'),
                comment: 'Wonderful landscape!'
            }
        ]
    },
    // User 2 (Trần Bình) - 4 ảnh
    {
        _id: '201',
        user_id: '2',
        date_time: new Date('2024-02-05T09:15:00'),
        file_name: 'z7690629706881_319d75035c5e1a29dcc6709ce80bdad7.jpg',
        image_url: `${BASE_URL}/images/z7690629706881_319d75035c5e1a29dcc6709ce80bdad7.jpg`,
        comments: [
            {
                _id: 'c6',
                photo_id: '201',
                user_id: '1',
                user: users[0],
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
        image_url: `${BASE_URL}/images/z7690629709827_2a78e43c5f2b7291d98d7c90b6ef2cc2.jpg`,
        comments: [
            {
                _id: 'c7',
                photo_id: '202',
                user_id: '3',
                user: users[2],
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
        image_url: `${BASE_URL}/images/z7690629717918_5952dbfb1ce0e4aef65f7aee0f128d06.jpg`,
        comments: []
    },
    // User 3 (Phạm Chi) - 3 ảnh
    {
        _id: '301',
        user_id: '3',
        date_time: new Date('2024-02-20T16:20:00'),
        file_name: 'z7690629719163_0ed824ddc421739be9c168f01eab0344.jpg',
        image_url: `${BASE_URL}/images/z7690629719163_0ed824ddc421739be9c168f01eab0344.jpg`,
        comments: [
            {
                _id: 'c8',
                photo_id: '301',
                user_id: '1',
                user: users[0],
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
        image_url: `${BASE_URL}/images/z7690629725424_e6dde6c8837d63f3248dc570c9999e98.jpg`,
        comments: [
            {
                _id: 'c9',
                photo_id: '302',
                user_id: '2',
                user: users[1],
                date_time: new Date('2024-02-25T13:00:00'),
                comment: 'Perfect capture!'
            }
        ]
    },
    // ============ Ảnh mới được thêm gần đây ============
    {
        _id: '104',
        user_id: '1',
        date_time: new Date('2024-03-01T13:45:00'),
        file_name: '391448203_317005497600467_5379599419520756808_n.jpg',
        image_url: `${BASE_URL}/images/391448203_317005497600467_5379599419520756808_n.jpg`,
        comments: [
            {
                _id: 'c10',
                photo_id: '104',
                user_id: '2',
                user: users[1],
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
        image_url: `${BASE_URL}/images/391546676_1474394810083074_4399402809588689087_n.jpg`,
        comments: [
            {
                _id: 'c11',
                photo_id: '204',
                user_id: '3',
                user: users[2],
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
        image_url: `${BASE_URL}/images/392755258_1474329076756314_1079558485968910719_n.jpg`,
        comments: [
            {
                _id: 'c12',
                photo_id: '303',
                user_id: '1',
                user: users[0],
                date_time: new Date('2024-03-10T12:00:00'),
                comment: 'Beautiful moment captured!'
            }
        ]
    }
];

// ============ THÔNG TIN SCHEMA ============
// Dữ liệu về cấu trúc và thời gian tải
const schemaInfo = {
    _id: 1,
    __v: 0,
    load_date_time: new Date().toISOString()
};

// ============ XUẤT CÁC HÀM ============
// Các hàm này được gọi từ server.js để truy cập dữ liệu

module.exports = {
    // Lấy danh sách tất cả người dùng
    userListModel: () => users,

    // Lấy 1 người dùng theo ID
    userModel: (userId) => users.find(u => u._id === userId),

    // Lấy tất cả ảnh của một user theo ID
    photoOfUserModel: (userId) => photos.filter(p => p.user_id === userId),

    // Lấy thông tin schema
    schemaInfo: () => schemaInfo
};
