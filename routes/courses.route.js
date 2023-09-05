
const express = require('express');

const router = express.Router();

const courseController = require('../controllers/courses.controller');

const { validationSchema } = require('../middleware/validationSchema');
const verifyToken = require('../middleware/verfiyToken');

router.route('/')
            .get(courseController.getAllCourses)
            .post(verifyToken, validationSchema(), courseController.addCourse);


router.route('/:courseId')
            .get(courseController.getCourse)
            .patch(courseController.updateCourse)
            .delete(courseController.deleteCourse);


module.exports = router;