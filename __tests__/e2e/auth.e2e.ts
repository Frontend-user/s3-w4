import mongoose from "mongoose";

const request = require('supertest')
import {app} from "../../src/app";
import {Routes} from "../../src/common/constants/routes";
const Cookies = require('js-cookie');

describe('/Users', () => {

    const mongoURI:string = process.env.MONGO_URL!

    beforeAll(async () => {
        /* Connecting to the database. */
        await mongoose.connect(mongoURI)
    })

    afterAll(async () => {
        /* Closing database connection after each test. */
        await mongoose.connection.close()
    })
    const token = 'Basic YWRtaW46cXdlcnR5'
    const clearUserData = {
        "pagesCount": 0,
        "page": 1,
        "pageSize": 10,
        "totalCount": 0,
        "items": []
    }
    let correctUserData = {
        "login": "string",
        "email": "emailemail@mail.ru",
        "password": "password",
    }
    let inCorrectUserData = {
        "login": "a",
        "email": "emailemail",
        "password": "a",
    }

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    let responseUserData: any
    it('[USERS] [GET USERS] [EXPECT 200 [] ]IS DELETE? Expect 200', async () => {
        responseUserData = await request(app)
            .post('/users')
            .set('Authorization', `${token}`)
            .send(correctUserData)
    })
    let jwt: any
    it('[AUTH]', async () => {
        jwt = await request(app)
            .post('/auth/login')
            .set('userid', responseUserData.body.id)
            .send({
                "loginOrEmail": "emailemail@mail.ru",
                "password": "password",
            })
    })
    it('[AUth refresh]', async () => {

        jwt = await request(app)
            .post('/auth/refresh-token')
            // .set('userid', responseUserData.body.id)
            // Cookies.set('refreshToken', '20001')
            .set('Cookie', ['refreshToken=2001'])
            .send({
                "accessToken": "string"
            // }
            //     "loginOrEmail": "emailemail@mail.ru",
            //     "password": "password",
            })
        expect('2').toEqual('2111')
    })
    // const JWT_TOKEN ='Bearer ' + jwt.body.accessToken

    it('[AUTH]', async () => {
        const getIdResponse = await request(app)

            .get('/auth/me')
            .set('authorization', 'Bearer ' + jwt.body.accessToken)

        expect(getIdResponse.body.userId).toEqual(responseUserData.body.id)
    })

    let blogId: any
    it('[CREATE BLOG]', async () => {
        const createResponse = await request(app)

            .post('/blogs')
            .set('Authorization', `${token}`)
            .send({
                "name": "string",
                "description": "string",
                "websiteUrl": "https://5kkaMCb8y1djFKwXX9cG7.com"
            })
        blogId = createResponse.body.id
        // expect(createResponse.body).toEqual('c')

    })
    let postId: any
    it('[CREATE POST]', async () => {
        const createResponse = await request(app)

            .post('/posts')
            .set('Authorization', `${token}`)
            .send({
                "title": "string",
                "shortDescription": "string",
                "content": "string",
                "blogId": blogId
            })
        postId = createResponse.body.id
        // expect(createResponse.body).toEqual('c')

    })
    let cretedComment: any
    it('[CREATE COMMENT]', async () => {
        const createResponse = await request(app)

            .post(`/posts/${postId}/comments`)
            .set('authorization', 'Bearer ' + jwt.body.accessToken)
            .send({"content": "COMMENTCOMMENTCOMMENTCOMMENTCOMMENTCOMMENTCOMMENTCOMMENTCOMMENTCOMMENT!"})
        // expect(createResponse.body).toEqual('c')
        cretedComment = createResponse.body
    })

    it('[AUTH]', async () => {
        let arr:any = {
            pagesCount: 1,
            page: 1,
            pageSize: 10,
            totalCount: 1,
            items: []
        }
        arr.items.push(cretedComment)

        const getCommentResp = await request(app)
            .get(`/posts/${postId}/comments`)
            .expect(200,arr)

    })


    afterAll(async () => {
        await request(app).delete('/testing/all-data')
    })


})