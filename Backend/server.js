// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './utils/logger.js';
//import authMiddleware from './middleware/authMiddleware.js';
import cors from 'cors';
import userRoutes from './route/userRoutes.js'
import waitlistRoutes from './route/waitListRoutes.js'; 
import courseRoutes from './route/courseRoutes.js';

import dotenv from "dotenv"
dotenv.config({ path: '../.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT;
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));


// Logging
app.use(logger.devLogger);
if (process.env.NODE_ENV === 'production') {
  app.use(logger.fileLogger);
}

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('CodeTribe Platform: running! and it is live on Render');
})

app.use('/api/users', userRoutes);
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/courses', courseRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`CodeTribe Platform Server running on http://localhost:${PORT}`);
});