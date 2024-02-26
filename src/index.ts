import express, {NextFunction, Request, Response} from 'express'
import {client, runDb} from "./db";
import {app} from "./app";

const PORT = 3000
app.set('trust proxy', true)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello!')
})


const startApp = async () => {
    await runDb()
    app.listen(PORT, () => {
        console.log(`START on PORT ${PORT}`)
    })

}
startApp()
