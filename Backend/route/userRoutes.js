import express from 'express';
import { registerPost } from '../controller/userController.js';

const router = express.Router();

router.post("/register", registerPost);  // Handle form submission

export default router;