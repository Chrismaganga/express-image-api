// import express from 'express';
// import path from 'path';
// import dotenv from 'dotenv';
// import multer, { FileFilterCallback } from 'multer';
// import bodyParser from 'body-parser';
// import { Request, Response } from 'express';

// dotenv.config();
// const app = express();
// const port = process.env.PORT || 3000;

// // Set up storage engine for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'images'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'));
//     }
//   }
// });

// // Serve static images
// app.use('src/images', express.static(path.join(__dirname, 'images')));

// // Middleware to parse JSON and URL-encoded bodies
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Log default data in JSON format to the console
// app.get('/contacts', (req, res) => {
//   console.log(JSON.stringify(defaultData, null, 2));  // Log the JSON data
//   res.json(defaultData);
// });

// // Serve HTML form for adding images
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Handle image uploads
// app.post('/upload', upload.single('avatar'), (req: Request, res: Response) => {
//   const { id, name, handle } = req.body;
  
//   if (!req.file) {
//     return res.status(400).send('No file uploaded or file type is incorrect.');
//   }

//   const avatarURL = `/images/${req.file.originalname}`;
//   const newContact = { id, name, handle, avatarURL };
  
//   defaultData.contacts.push(newContact);

//   console.log(`New contact added: ${JSON.stringify(newContact, null, 2)}`);
//   res.redirect('/');
// });

// // Default data
// const defaultData = {
//   contacts: [
//     {
//       id: 'richard',
//       name: 'Richard Kalehoff',
//       handle: '@richardkalehoff',
//       avatarURL: '/images/richard.jpg'
//     },
//     {
//       id: 'karen',
//       name: 'Karen Isgrigg',
//       handle: '@karen_isgrigg',
//       avatarURL: '/images/karen.jpg'
//     },
//     {
//       id: 'tyler',
//       name: 'Tyler McGinnis',
//       handle: '@tylermcginnis',
//       avatarURL: '/images/tyler.jpg'
//     }
//   ]
// };

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// export default app;
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import multer, { FileFilterCallback } from 'multer';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'images'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Serve static images
app.use('src/images', express.static(path.join(__dirname, 'images')));

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log default data in JSON format to the console
app.get('/contacts', (req, res) => {
  console.log(JSON.stringify(defaultData, null, 2));  // Log the JSON data
  res.json(defaultData);
});

// Serve HTML form for adding images
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle image uploads
app.post('/upload', upload.single('avatar'), (req: Request, res: Response) => {
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

export default app;
