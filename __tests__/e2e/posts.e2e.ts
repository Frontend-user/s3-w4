import request from "supertest";
import {app} from "../../src/app";
import mongoose from "mongoose";
// @ts-ignore
import {customTestsService} from "./custom-tests.e2e";
import {LIKE_STATUSES} from "../../src/common/constants/http-statuses";

const mongoURI: string = process.env.MONGO_URL!
beforeAll(async () => {
    await mongoose.connect(mongoURI)
})

afterAll(async () => {
    await mongoose.connection.close()
})
let correctUserData = {
    "login": "string",
    "email": "emailemail@mail.ru",
    "password": "password",
}
let correctSecondUserData = {
    "login": "string2",
    "email": "emailemail2@mail.ru",
    "password": "password",
}
let THREE_USER_correctSecondUserData = {
    "login": "string3",
    "email": "emailemail3@mail.ru",
    "password": "password",
}
let FOUR_USER_correctSecondUserData = {
    "login": "string4",
    "email": "emailemail4@mail.ru",
    "password": "password",
}
const ENTITIES = {
    POSTS: 'posts',
    COMMENTS: 'comments',

}

let createdUserId: any
let tokens = {
    accessToken: '', refreshToken: ''
}
let blogId: any
let postId: any
let comment: any
let commentId: any
const textGreenColor = '\x1b[32m%s\x1b[0m'
const consoleLog = (action: string, responseName: string, response: any) => {
    console.log(textGreenColor, `${action} \n` +
        `${responseName}: `, response)
}
describe('/CUSTOM', () => {
    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    it('CREATE USER', async () => {
        createdUserId = await customTestsService.createUser(correctUserData)
        consoleLog('CREATE USER', 'createdUserId', createdUserId)
    });


    it('LOGIN', async () => {
        tokens = await customTestsService.login({
            "loginOrEmail": correctUserData.email,
            "password": correctUserData.password,
        })
        consoleLog('LOGIN', 'accessToken', tokens.accessToken)
        // consoleLog('LOGIN', 'refreshToken', tokens.refreshToken)
    });

    it('CREATE BlOG', async () => {
        let response  = await customTestsService.createBlog(tokens.accessToken)
        blogId = response.body.id
        consoleLog('CREATE BlOG','blogId',response.body)
    });

    it('CREATE POST', async () => {
        let response = await customTestsService.createPost(tokens.accessToken, blogId)
        postId = response.body.id
        consoleLog('CREATE POST','postId',response.body)
    });
    it('LIKE POST', async () => {
        comment = await customTestsService.likeEntity(
            ENTITIES.POSTS, tokens.accessToken,
            postId, LIKE_STATUSES.LIKE)
        console.log(comment.body.extendedLikesInfo, 'comment.body.likesInfo')
        consoleLog('LIKE COMMENT', 'comment', comment.body)
    });

    let createdUserId2: any
    let tokens2 = {
        accessToken: '', refreshToken: ''
    }
    it('CREATE USER', async () => {
        createdUserId2 = await customTestsService.createUser(correctSecondUserData)
        consoleLog('CREATE USER', 'createdUserId2', createdUserId2)
    });


    it('LOGIN', async () => {
        tokens2 = await customTestsService.login({
            "loginOrEmail": correctSecondUserData.email,
            "password": correctSecondUserData.password,
        })
        consoleLog('LOGIN', 'accessToken', tokens2.accessToken)
        // consoleLog('LOGIN', 'refreshToken', tokens2.refreshToken)
    });


    it('LIKE POST', async () => {
        comment = await customTestsService.likeEntity(
            ENTITIES.POSTS, tokens2.accessToken,
            postId, LIKE_STATUSES.LIKE)
        console.log(comment.body.extendedLikesInfo, 'comment.body.likesInfo')
        consoleLog('LIKE COMMENT', 'comment', comment.body)
    });
    let createdUserId3: any
    let tokens3 = {
        accessToken: '', refreshToken: ''
    }
    it('CREATE USER', async () => {
        createdUserId3 = await customTestsService.createUser(THREE_USER_correctSecondUserData)
        consoleLog('CREATE USER', 'createdUserId3', createdUserId3)
    });


    it('LOGIN', async () => {
        tokens3 = await customTestsService.login({
            "loginOrEmail": THREE_USER_correctSecondUserData.email,
            "password": THREE_USER_correctSecondUserData.password,
        })
        consoleLog('LOGIN', 'accessToken', tokens3.accessToken)
        // consoleLog('LOGIN', 'refreshToken', tokens3.refreshToken)
    });


    it('LIKE POST', async () => {
        comment = await customTestsService.likeEntity(
            ENTITIES.POSTS, tokens3.accessToken,
            postId, LIKE_STATUSES.LIKE)
        console.log(comment.body.extendedLikesInfo, 'comment.body.likesInfo')
        consoleLog('LIKE COMMENT', 'comment', comment.body)
    });

    let createdUserId4: any
    let tokens4 = {
        accessToken: '', refreshToken: ''
    }
    it('CREATE USER', async () => {
        createdUserId4 = await customTestsService.createUser(FOUR_USER_correctSecondUserData)
        consoleLog('CREATE USER', 'createdUserId4', createdUserId4)
    });


    it('LOGIN', async () => {
        tokens4 = await customTestsService.login({
            "loginOrEmail": FOUR_USER_correctSecondUserData.email,
            "password": FOUR_USER_correctSecondUserData.password,
        })
        consoleLog('LOGIN', 'accessToken', tokens4.accessToken)
        // consoleLog('LOGIN', 'refreshToken', tokens4.refreshToken)
    });


    it('LIKE POST', async () => {
        comment = await customTestsService.likeEntity(
            ENTITIES.POSTS, tokens4.accessToken,
            postId, LIKE_STATUSES.LIKE)
        console.log(comment.body.extendedLikesInfo, 'comment.body.likesInfo')
        consoleLog('LIKE COMMENT', 'comment', comment.body)
    });
    // it('LOGOUT', async () => {
    //     let logoutResponse = await customTestsService.logout(tokens.refreshToken)
    //     consoleLog('LOGOUT', 'logoutResponse', logoutResponse)
    // });
    //



})
