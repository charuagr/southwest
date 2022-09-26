import React from 'react';
import {Map, Marker, GeoJson, GeoJsonFeature} from 'pigeon-maps'
import axios from 'axios';
import {osm} from 'pigeon-maps/providers'
import { stamenTerrain } from 'pigeon-maps/providers'
import {backend_url} from './util'

interface IState {
    geoJsonFeatures?: any
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
             }]}
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
    
    
    render () {

        return (
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
            }}> </GeoJson>

         </Map> 
        )


    }
}