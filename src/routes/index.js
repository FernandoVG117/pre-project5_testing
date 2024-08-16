const express = require('express');
const routeStudent = require('./student.router');
const routerCourse = require('./course.router');
const router = express.Router();

router.use('/students', routeStudent);
router.use('/courses', routerCourse);


module.exports = router;