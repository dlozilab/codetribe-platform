import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import * as courseController from '../controller/courseController.js';

const router = express.Router();

// Public/Authenticated: Everyone can see courses
router.get('/', courseController.fetchCourses);
router.get('/:id', courseController.fetchCourseDetail);

// Protected: Only authorized staff should modify courses
router.post('/', authMiddleware, courseController.addCourse);
router.put('/:id', authMiddleware, courseController.modifyCourse);
router.delete('/:id', authMiddleware, courseController.removeCourse);

export default router;