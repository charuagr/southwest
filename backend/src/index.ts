import express, { Express, Request, Response } from 'express';
import {Database} from 'sqlite3';

const app: Express = express();
const port = 1200;

const db = new Database('../db/main.db')
function read_database(sql:string):Promise<Array<any>> {
    return new Promise((resolve, reject) => {
        db.all(sql, (err,rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}

app.get('/cities', async (req: Request, res: Response) => {
    let response:Array<string> = []
    let data:Array<any> = await read_database("select ADM3_EN from Iraq")
    for (const x of data) {
        response.push(x['ADM3_EN'])
    }
    
    res.send(response);
})
app.get('/corn', async (req: Request, res: Response) => {
    
    let data = await read_database("select ADM3_EN,\"Corn Production\" from Iraq")
    res.send(data);
});

app.listen(port, async () => {

  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});