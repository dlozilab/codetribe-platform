import express from 'express';
import {registerUser, fetchAllUsers, loginUser,} from '../controller/userController.js';

const router = express.Router();

router.post("/register", registerUser);  // Handle form submission
router.get("/all", fetchAllUsers);  // Fetch all users
router.post("/login", loginUser); // Handle login


export default router;