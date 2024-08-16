const request = require('supertest');
const app = require('../app');

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
})

    // GET (getOne)
test("GET -> BASE_URL/courseId, should return statusCode 200, res.body.name === course.name", async() => {

    const res = await request(app)
        .get(`${BASE_URL}/${courseId}`)
        
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(course.name)
})

    // PUT (Update)
test("PUT -> BASE_URL/courseId, should return statusCode 200, res.body.name === coursetUpdate.name", async() => {
    const courseUpdate = {
        name: "Philosophy"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${courseId}`)
        .send(courseUpdate)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(courseUpdate.name)
})

    // DELETE (Delete)
test("DELETE -> BASE_URL/courseId, should return 204", async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${courseId}`)

        expect(res.statusCode).toBe(204)
})

