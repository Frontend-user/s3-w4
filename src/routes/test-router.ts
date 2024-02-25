import {Request, Response, Router} from "express";
import {client, RecoveryCodeModel} from "../db";

export const testRouter = Router({})

testRouter.delete('/all-data', async (req: Request, res: Response) => {
    try {
        await client.connect()

        await client.db('db').collection('blogs').deleteMany({});
        await client.db('db').collection('posts').deleteMany({});
        await client.db('db').collection('users').deleteMany({});
        await client.db('db').collection('comments').deleteMany({});
        await client.db('db').collection('tokens').deleteMany({});
        await client.db('db').collection('devices').deleteMany({});
        await RecoveryCodeModel.deleteMany({});

        res.sendStatus(204)

    } catch (error) {
        console.error('Ошибка при попытке удалить все данные из бд')
    }
})