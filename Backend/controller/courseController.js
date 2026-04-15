import * as courseService from '../services/courseService.js';

export const addCourse = async (req, res) => {
  const { title, description, staff_id } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Course title is required" });
  }

  try {
    const newCourse = await courseService.createCourse({
      title,
      description,
      staff_id // This links the course to a staff member/facilitator
    });

    return res.status(201).json(newCourse);
  } catch (error) {
    console.error("Course creation error:", error.message);
    return res.status(500).json({ error: "Failed to create course" });
  }
};

export const fetchCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const fetchCourseDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await courseService.getCourseById(id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const modifyCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await courseService.updateCourse(id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const removeCourse = async (req, res) => {
  const { id } = req.params;
  try {
    await courseService.deleteCourse(id);
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};