"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Set up storage engine for multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, 'images'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});
// Serve static images
app.use('src/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
// Middleware to parse JSON and URL-encoded bodies
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Log default data in JSON format to the console
app.get('/contacts', (req, res) => {
    console.log(JSON.stringify(defaultData, null, 2)); // Log the JSON data
    res.json(defaultData);
});
// Serve HTML form for adding images
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'index.html'));
});
// Handle image uploads
app.post('/upload', upload.single('avatar'), (req, res) => {
    const { id, name, handle } = req.body;
    if (!req.file) {
        return res.status(400).send('No file uploaded or file type is incorrect.');
    }
    const avatarURL = `/images/${req.file.originalname}`;
    const newContact = { id, name, handle, avatarURL };
    defaultData.contacts.push(newContact);
    console.log(`New contact added: ${JSON.stringify(newContact, null, 2)}`);
    res.redirect('/');
});
// Default data
const defaultData = {
    contacts: [
        {
            id: 'richard',
            name: 'Richard Kalehoff',
            handle: '@richardkalehoff',
            avatarURL: '/images/richard.jpg'
        },
        {
            id: 'karen',
            name: 'Karen Isgrigg',
            handle: '@karen_isgrigg',
            avatarURL: '/images/karen.jpg'
        },
        {
            id: 'tyler',
            name: 'Tyler McGinnis',
            handle: '@tylermcginnis',
            avatarURL: '/images/tyler.jpg'
        }
    ]
};
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
exports.default = app;
