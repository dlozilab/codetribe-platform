import express from 'express';
import { addToWaitlist, getWaitlist } from '../controller/waitListController.js';

const router = express.Router();

router.post("/", addToWaitlist); 
router.get("/", getWaitlist); 

export default router;