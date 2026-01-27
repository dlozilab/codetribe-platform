// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './utils/logger.js';
import authMiddleware from './middleware/authMiddleware.js';
import cors from 'cors';
import userRoutes from './route/userRoutes.js'
import dotenv from "dotenv"
dotenv.config({ path: '../.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT;
app.use(cors())

// Logging
app.use(logger.devLogger);
if (process.env.NODE_ENV === 'production') {
  app.use(logger.fileLogger);
}


// Routes
app.get('/', (req, res) => {
  res.send('CodeTribe Platform: running!')
})

app.use('/api/users', authMiddleware, userRoutes);


// 404 fallback
app.use((req, res) => {
  res.status(404).render('system/notFound');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});