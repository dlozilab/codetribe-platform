import express from 'express';
import { addToWaitlist } from '../controller/waitListController.js';

const router = express.Router();

router.post("/", addToWaitlist); 

export default router;