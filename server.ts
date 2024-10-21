import express, { Request, Response } from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 5000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Use raw body parsing middleware for image data (e.g., JPEG, PNG)
app.use(bodyParser.raw({ type: ['image/jpeg', 'image/png'], limit: '5mb' }));

// POST route for uploading an image
app.post('/upload', async (req: Request, res: Response) => {
  const imagePath = path.join(__dirname, 'uploaded_image.jpeg'); // Store the image in the current directory
  try {
    await fs.promises.writeFile(imagePath, req.body); // Use promise-based fs API
    console.log('Image saved successfully.');
    res.sendStatus(200); // Send 200 status code
  } catch (error) {
    console.error('Error saving the image:', error);
    res.sendStatus(500); // Send 500 status code on error
  }
});

// GET route for downloading the uploaded image
app.get('/download', (req: Request, res: Response) => {
  const imagePath = path.join(__dirname, 'uploaded_image.jpeg'); // Ensure the path is correct
  console.log(`Attempting to send file from: ${imagePath}`); // Log the path for debugging
  
  res.sendFile(imagePath, (err: any) => { // Use `any` for err
    if (err) {
      console.error('Error sending the file:', err);
      if (err.code === 'ENOENT') {
        res.status(404).send('File not found');
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  });
});


// DELETE route for deleting the uploaded image
app.delete('/delete', (req: Request, res: Response) => {
  const imagePath = path.join(__dirname, 'uploaded_image.jpeg'); // Ensure the path is correct
  fs.unlink(imagePath, (error) => {
    if (error) {
      console.error('Error deleting the image:', error);
      res.status(500).send('Error deleting the image');
    } else {
      console.log('Image deleted successfully.');
      res.status(200).send('Image deleted successfully.');
    }
  });
});

// PUT route for updating the uploaded image
app.put('/update', async (req: Request, res: Response) => {
  const imagePath = path.join(__dirname, 'uploaded_image.jpeg'); // Ensure the path is correct
  try {
    await fs.promises.writeFile(imagePath, req.body); // Use promise-based fs API
    console.log('Image updated successfully.');
    res.status(200).send('Image updated successfully.');
  } catch (error) {
    console.error('Error updating the image:', error);
    res.status(500).send('Error updating the image');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Image upload server listening on port ${port}`);
});
