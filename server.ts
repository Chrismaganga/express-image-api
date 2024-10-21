// Importing necessary modules with proper types
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// Set the port
const port = 3000;

// Create an instance of express
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

// Define a route handler for GET requests
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});



// Start the server
app.listen(port, () => {
  console.log(`image-api server listening on port ${port}`);
});
