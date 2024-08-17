require('../models')

const request = require('supertest');
const app = require('../app');
const Student = require('../models/Student');

let courseId

const BASE_URL = '/api/v1/courses'
const course = {
    name: "Node.js",
    credits: 10
}

    // CREATE
test("POST -> BASE_URL, should return statusCode 201, and req.body.name === course.name", async() => {
    const res = await request(app)
        .post(BASE_URL)
        .send(course)

        courseId = res.body.id

        expect(res.status).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(course.name)
})

    // GET (getAll)
test("GET -> BASE_URL, should return statusCode 200, res.body.length === 1", async() => {
    const res = await request(app)
        .get(BASE_URL)

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
        // expect(res.body.length).toBe(1)

        // console.log(res.body)

        expect(res.body[0].students).toBeDefined()
        expect(res.body[0].students).toHaveLength(0)
})

    // GET (getOne)
test("GET -> BASE_URL/courseId, should return statusCode 200, res.body.name === course.name", async() => {

    const res = await request(app)
        .get(`${BASE_URL}/${courseId}`)
        
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(course.name)

        // console.log(res.body)

        expect(res.body.students).toBeDefined()
        expect(res.body.students).toHaveLength(0)
})

    // PUT (Update)
test("PUT -> BASE_URL/courseId, should return statusCode 200, res.body.name === coursetUpdate.name", async() => {
    const courseUpdate = {
        name: "Philosophy",
        credits: 5
    }

    const res = await request(app)
        .put(`${BASE_URL}/${courseId}`)
        .send(courseUpdate)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(courseUpdate.name)
        expect(res.body.credits).toBe(courseUpdate.credits)
})

    // POST (SetStudents)
test("POST -> BASE/courses/:id/students, should return statusCode 200, and res.body.courses.length === 1", async() => {
    const student = {
        firstName: "Harry",
        lastName: "Potter",
        birthday: "2020-02-20",
        program: "Magical Defense",
    }

    const studentTester = await Student.create(student)

    const res = await request(app)
        .post(`${BASE_URL}/${courseId}/students`)
        .send([studentTester.id])

        // console.log(res.body)
        // console.log(res.body[0].courseStudent)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
        expect(res.body[0].id).toBeDefined()
        expect(res.body[0].id).toBe(studentTester.id)

    await studentTester.destroy()
})

    // DELETE (Delete)
test("DELETE -> BASE_URL/courseId, should return 204", async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${courseId}`)

        expect(res.statusCode).toBe(204)
})

