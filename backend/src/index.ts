import express, { Express, Request, Response } from 'express';
import {Database} from 'sqlite3';

const app: Express = express();
const port = 1200;

const db = new Database('../db/main.db')
function read_database(sql:string) {
    return new Promise((resolve, reject) => {
        db.all(sql, (err,rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}
app.get('/corn', async (req: Request, res: Response) => {
    
    let data = await read_database("select ADM3_EN,\"Corn Production\" from Iraq")
    res.send(data);
});

app.listen(port, async () => {

  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});