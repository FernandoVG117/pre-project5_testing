const Course = require('./Student');
const Student = require('./Course');

Course.belongsToMany(Student, {through: "courseStudent"})
Student.belongsToMany(Course, {through: "courseStudent"})