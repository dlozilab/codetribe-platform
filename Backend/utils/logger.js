import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

// Ensure logs directory exists
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Generate daily log file name (e.g. 2025-05-15-access.log)
const date = new Date().toISOString().split('T')[0];
const logFile = path.join(logDir, `${date}-access.log`);

// Create a write stream
const accessLogStream = fs.createWriteStream(logFile, { flags: 'a' });

// Morgan middleware for file and console
const logger = {
  fileLogger: morgan('combined', { stream: accessLogStream }),
  devLogger: morgan('dev'),
};

export default logger;
