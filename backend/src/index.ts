import express, { Express, Request, Response } from 'express';
import {Database} from 'sqlite3';

import path from 'path'
import cors from'cors'
const app: Express = express();
const port = 1200;
app.use(cors())
console.log("Dir", __dirname);

const db = new Database('/usr/src/app/db/main.db')
function read_database(sql:string, param?:any):Promise<Array<any>> {
    return new Promise((resolve, reject) => {
        db.all(sql, param, (err,rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}
const api = express.Router()


api.get('/geojson/:section', async (req, res) => {
    console.log(req.params.section);
    
    let data:Array<any> = await read_database("select geometry from Iraq where ADM3_EN=$city", {
        $city: req.params.section
    })
    if(data.length == 0){
        res.sendStatus(404)
    } else {
        let poly:string = data[0].geometry
        let matchResult = poly.match("POLYGON \(\((?<coords>.*)\)\)")

        let polyList:string|undefined|string[] = matchResult?.groups?.coords
        polyList = polyList?.replace('((', '').replace('))','').split(',')
        // console.log(polyList);
        
        let numList = []
        if (polyList) {
            for (let x of polyList) {
                if (x.startsWith(' ')) {
                    x= x.replace(' ','')
                }
                let coors = x.split(' ')
                let lat = parseFloat(coors[0])
                let long = parseFloat(coors[1])
                numList.push([lat, long])
            }
        }
        
        let geoJson = {
            type: "Feature",
            "geometry": {
                type: "Polygon",
                coordinates: [numList]
            }
        }
        res.send(geoJson)
        
    }
    


})
api.get('/params', async (req:Request, res:Response) => {
    let response:Array<string> = []
    let data:Array<any> = await read_database("PRAGMA table_info(Iraq)")
    
    for (const x of data) {
        if (x['name'] == "ADM3_EN" || x['name'] == 'geometry') continue
        response.push(x['name'])
    }
    res.send(response);

})
api.get('/cities', async (req: Request, res: Response) => {
    let response:Array<string> = []
    let data:Array<any> = await read_database("select ADM3_EN from Iraq")
    for (const x of data) {
        response.push(x['ADM3_EN'])
    }
    
    res.send(response);
})
api.get('/corn', async (req: Request, res: Response) => {
    
    let data = await read_database("select ADM3_EN,\"Corn Production\" from Iraq")
    res.send(data);
});

app.use('/api',api)
app.use(express.static("/usr/src/app/frontend/build"))

app.listen(port, async () => {

  console.log(`⚡️[server]: Server is running at ${__dirname}`);
});