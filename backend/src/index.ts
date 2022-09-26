import express, { Express, Request, Response } from 'express';
import {Database} from 'sqlite3';

import path from 'path'
import cors from'cors'
const port = process.env.PORT || 1200;
const NODE_ENV = process.argv[2]
console.log("ENV", NODE_ENV);

let db:Database
if (NODE_ENV === 'production') {
    db = new Database('/usr/src/app/db/main.db')
} else {
    db = new Database('../db/main.db')
}
function read_database(sql:string, param?:any):Promise<Array<any>> {
    return new Promise((resolve, reject) => {
        db.all(sql, param, (err,rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}


const app: Express = express();
app.use(cors())
const api = express.Router()


api.get('/geojson/:section', async (req, res) => {
    
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
        let mean_lat = 0
        let mean_long = 0
        if (polyList) {
            for (let x of polyList) {
                if (x.startsWith(' ')) {
                    x= x.replace(' ','')
                }
                let coors = x.split(' ')
                let lat = parseFloat(coors[0])
                let long = parseFloat(coors[1])
                mean_lat += lat
                mean_long += long
                numList.push([lat, long])
            }
            mean_lat = mean_lat / polyList.length
            mean_long = mean_long / polyList.length
        }
        
        let geoJson = {
            type: "Feature",
            "geometry": {
                type: "Polygon",
                coordinates: [numList]
            },
            properties: {
                district: req.params.section,
                mean_center: [ mean_long, mean_lat]
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

  console.log(`⚡️[server]: Server is running at ${NODE_ENV}`);
});