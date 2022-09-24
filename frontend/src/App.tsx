import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { render } from '@testing-library/react';
import Select from 'react-select';

class TableItem extends React.Component<{name:string}> {
  render() {
    return <option> {this.props.name}</option>
  }
}
class Cities extends React.Component<{country:string}, {list:Array<string>}> {
  constructor(props:{country:string}) {
    super(props);
    this.state = {
      'list':[]
    }
  }

  componentDidMount() {
    axios.get("http://localhost:1200/cities").then((res:any)=>{
      
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
        Select Counties you want to see
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
    axios.get("http://localhost:1200/params").then((res:any)=>{
      
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





function App() {
  return (
    <div >
        <Cities country = "Iraq"></Cities>
        <Params></Params>
    </div>
  );
}

export default App;
