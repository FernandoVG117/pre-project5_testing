const { getAll, create, getOne, remove, update } = require('../controllers/student.controllers');
const express = require('express');

const routeStudent = express.Router();

routeStudent.route('/')
    .get(getAll)
    .post(create);

routeStudent.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routeStudent;