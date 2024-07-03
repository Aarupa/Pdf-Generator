import cors from 'cors';
import express, { ErrorRequestHandler } from 'express'; // Import ErrorRequestHandler
import mongoose from 'mongoose';
import pdfRoutes from './routes/pdfRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pdf', pdfRoutes);

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/invoice-generator';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${res.statusCode}`);
  next();
});

// Error Handling Middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Internal Server Error: ${err.message}`);
};

app.use(errorHandler); // Use the error handling middleware

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('Server shutting down...');
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
