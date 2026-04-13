import express from 'express';
import { registerUser, fetchAllUsers } from '../controller/userController.js';

const router = express.Router();

router.post("/register", registerUser);  // Handle form submission
router.get("/all", fetchAllUsers);  // Fetch all users

export default router;