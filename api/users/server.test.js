// Write your tests here

const request = require('supertest')
const server = require('../server')
const database = require('../../data/dbConfig')

beforeAll(async ()=>{
    await database.migrate.rollback()
    await database.migrate.latest()
})

afterAll(async() =>{
await database.destroy()
})

describe('Sanity Check', () => {
    test('Tests are working as intended', ()=>{
        expect(true).not.toBe(false)
    })
})

describe("[POST] /api/auth/login", ()=>{

    const newUser = {
      username: "Robert",
      password: "1234"
    }
  
    let res
    beforeAll(async()=>{
        res = await request(server).post("/api/auth/login").send(newUser)
    })
  
    it("Has 201 code", async ()=>{
      expect(res.status).toBe(201)
    })

    it("Returns Proper Response", async ()=>{
      expect(res.body.message).not.toContain(`${newUser.username}`)
    })
  })


  describe("[GET] /api/jokes", ()=>{

    it("Has the Required Token", async ()=>{
      let res = await request(server).get('/api/jokes')
      expect(res.body.message).toBe(undefined)
    })

    it("Returns With a Joke If The Required Token Exists", async ()=>{
        const currentUser = {
            username:"Robert",
            password:"1234",
        }
        let login = await (await request(server).post('/api/auth/login')).send(currentUser)
        let token = login.body.token
        let res = await request(server).get('/api/jokes')
        .set('Auth', token)

        expect(res.body).toHaveLength(3)


    })
  })
