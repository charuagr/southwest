import React from 'react';
import {Map, Marker, GeoJson, Overlay } from 'pigeon-maps'
import axios from 'axios';
import {osm} from 'pigeon-maps/providers'
import { stamenTerrain } from 'pigeon-maps/providers'
import {backend_url} from './util'

interface IState {
    geoJsonFeatures?: any
    select_district: string
    mean_anchor:[number,number]
}

interface IProp {
  districts:string[]
}

export class InteractiveMap extends React.Component<IProp, IState> {
    constructor(props:IProp) {
        super(props)
        this.state = {
            geoJsonFeatures:[
            {
                type: "Feature",
                geometry: {
                  type: "MultiPolygon",
                  coordinates: []
                },
             }],
            select_district: "t",
            mean_anchor: [43.913898686391015, 33.48787577839854]}
    }
    async componentDidUpdate(prevProps:any) {
        if (prevProps === this.props) {          
          return
        }
        const geoFeatures:Array<any> = []
        for (const x of this.props.districts) {
            let dat = await axios.get(backend_url + "geojson/" + x)
            
            geoFeatures.push(dat.data)
        }
        
        this.setState({geoJsonFeatures:geoFeatures})
    }
    
    clickHandler(event:any, anchor:any, feature:any) {
      console.log("EVENT", event);
      console.log("anchor", anchor);
      console.log("feature", feature);
      this.setState({select_district: feature.properties.district, mean_anchor: feature.properties.mean_center})


    }
    render () {

        return (
          <div>
            <Map height={1000} defaultCenter={[
              33.312805, 44.361488
              ]} defaultZoom={7}>

            <GeoJson data = {{
                type: "FeatureCollection",
                features: this.state.geoJsonFeatures
            }} styleCallback = {(feature:any, hover:boolean) => {
              if (hover) {
                return {
                  fill: "#cf2e59fe",
                  strokeWidth: "4",
                  stroke: "#ffffff",
                  r: "20"
                }
              } else {
                return {
                  fill: "#0d5656d6",
                  strokeWidth: "2",
                  stroke: "#fafafaff",
                  r: "20"
                }

              }
            }} onClick={({event, anchor, payload})=>{this.clickHandler(event, anchor, payload)}}> </GeoJson>
            <Overlay anchor={this.state.mean_anchor} offset={[0, 0]}>
              <h3>{this.state.select_district}</h3>
            </Overlay>
         </Map> 

          </div>
        )


    }
}