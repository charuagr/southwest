import React from 'react';
import './App.css';
import axios from 'axios';
import Select from 'react-select';
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import {useRef, useEffect} from "react"

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


function ArcMap2() {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const map = new WebMap({
        portalItem: {
          id: "aa1d3f80270146208328cf66d022e09c"
        }
      });
      
      const view = new MapView({
        map: map,
        container: mapDiv.current,
        center: [-118.244, 34.052],
        zoom: 20
      });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}
// class ArcMap1 extends React.Component<{},{}>{
//   mapDiv = useRef(null)
//   constructor(props:{}) {
//     super(props)
//   }
//   componentDidMount() {
//     const map = new ArcGISMap({
//             basemap: "streets-vector"
//     });
//     if(this.mapDiv.current ) {
//       // console.log(this.mapDiv);
      
//       const view = new MapView({
//         map: map,
//         container: "test",
//         center: [-118.244, 34.052],
//         zoom: 12
//       });
//     }
//   }

//   render() {
//         return (
//         <div id="viewDiv" ref = {this.mapDiv}></div>
//     )
//   }
// }
// function ArcMap() {

//   const mapDiv = useRef(null);

//   useEffect(() => {
//     if (mapDiv.current) {
//       /**
//        * Initialize application
//        */
//       const webmap = new WebMap({
//         portalItem: {
//           id: "aa1d3f80270146208328cf66d022e09c"
//         }
//       });

//       const view = new MapView({
//         container: mapDiv.current,
//         map: webmap
//       });

//       const bookmarks = new Bookmarks({
//         view,
//         // allows bookmarks to be added, edited, or deleted
//         editingEnabled: true
//       });

//       const bkExpand = new Expand({
//         view,
//         content: bookmarks,
//         expanded: true
//       });

//       // Add the widget to the top-right corner of the view
//       view.ui.add(bkExpand, "top-right");

//       // bonus - how many bookmarks in the webmap?
//       webmap.when(() => {
//         if (webmap.bookmarks && webmap.bookmarks.length) {
//           console.log("Bookmarks: ", webmap.bookmarks.length);
//         } else {
//           console.log("No bookmarks in this webmap.");
//         }
//       });
//     }
//   }, []);

//   return <div className="mapDiv" ref={mapDiv}></div>;
// }
// class ArcMap extends React.Component<{},{}> {




//   componentDidMount() {

    

//   }

//   render() {
//     const map = new ArcGISMap({
//       basemap: "streets-vector"
//     });
    
//     const view = new MapView({
//       map: map,
//       container: "viewDiv",
//       center: [-118.244, 34.052],
//       zoom: 12
//     });
//     return (
//       <div>
//         <h1>Hello</h1>
//         <div id="viewDiv">

//         </div>

//       </div>

//     )
//   }
// }

function App() {
  return (
    <div >
        <Cities country = "Iraq"></Cities>
        <Params></Params>
        <ArcMap2></ArcMap2>
    </div>
  );
}

export default App;
