import React from 'react';
import './App.css';
import axios from 'axios';
import Select from 'react-select';
import {useRef, useEffect} from "react"
import {Map, Marker, GeoJson, GeoJsonFeature} from 'pigeon-maps'

import {InteractiveMap} from './Map'
import {backend_url} from './util'
import { render } from '@testing-library/react';
interface IDistrictProps {
  districts:string[]
}
interface IDistrictState {

}
class District extends React.Component<IDistrictProps, IDistrictState> {
  constructor(props:IDistrictProps) {
    super(props);
  }


  render() {
    let multiOptions = []
    for (const x of this.props.districts) {
      multiOptions.push( {value: x, label:x})
    }
    return(
      <div>
        Select Districts you want to see
      <Select options = {multiOptions} isMulti = {true}/>

      </div>
    );
  }
}


class Params extends React.Component<{}, {list:Array<string>}> {
  constructor(props:{country:string}) {
    super(props);
    this.state = {
      'list':[]
    }
  }

  componentDidMount() {
    axios.get(backend_url + "params").then((res:any)=>{
      
      this.setState({list:res.data})
    })
  }

  render() {
    let multiOptions = []
    for (const x of this.state.list) {
      multiOptions.push( {value: x, label:x})
    }
    return(
      <div>
        Select Parameters you wish to see
      <Select options = {multiOptions} isMulti = {true}/>
      </div>
    );
  }
}

interface IAppProps {

}
interface IAppState {
  counties:string[]
}
class App extends React.Component<IAppProps, IAppState> {


  constructor(props:IAppProps) {
    super(props)
    this.state = {
      counties: []
    }
  }

  componentDidMount() {
    axios.get(backend_url + "cities").then((res:any)=>{
      
      this.setState({counties:res.data})
    })
  }
  render() {
    
    return (
    <div >
      <District districts = {this.state.counties}></District>
      <Params></Params>
      <InteractiveMap districts={this.state.counties}></InteractiveMap>
    </div>
    )
  }
}


export default App;
