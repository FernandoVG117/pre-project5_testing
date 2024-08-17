require('../models')

const request = require('supertest');
const app = require('../app');

let studentId

const BASE_URL = '/api/v1/students'
const student = {
    firstName: "Jose Maria",
    lastName: "Chihuan Arellano",
    birthday: "1995-05-10",
    program: "Informatic Technologies"
}

    // CREATE
test("POST -> BASE_URL, should return statusCode 201, and req.body.firstName === student.firstName", async() => {
    const res = await request(app)
        .post(BASE_URL)
        .send(student)

        studentId = res.body.id

        expect(res.status).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(student.firstName)
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

        expect(res.body[0].courses).toBeDefined()
        expect(res.body[0].courses).toHaveLength(0)
})

    // GET (getOne)
test("GET -> BASE_URL/studentId, should return statusCode 200, res.body.firstName === student.firstName", async() => {

    const res = await request(app)
        .get(`${BASE_URL}/${studentId}`)
        
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(student.firstName)

        // console.log(res.body)

        expect(res.body.courses).toBeDefined()
        expect(res.body.courses).toHaveLength(0)
})

    // PUT (Update)
test("PUT -> BASE_URL/studentId, should return statusCode 200, res.body.firstName === studentUpdate.firstName", async() => {
    const studentUpdate = {
        firstName: "Patroclo",
        lastName: "Areyano",
        birthday: "2020-02-02",
        program: "Strategic"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${studentId}`)
        .send(studentUpdate)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(studentUpdate.firstName)
        expect(res.body.lastName).toBe(studentUpdate.lastName)
        expect(res.body.birthday).toBe(studentUpdate.birthday)
        expect(res.body.program).toBe(studentUpdate.program)
})

    // DELETE (Delete)
test("DELETE -> BASE_URL/studentId, should return 204", async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${studentId}`)

        expect(res.statusCode).toBe(204)
})

