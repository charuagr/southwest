import React from 'react';
import './App.css';
import axios from 'axios';
import Select from 'react-select';
import {useRef, useEffect} from "react"
import {Map, Marker, GeoJson, GeoJsonFeature} from 'pigeon-maps'

import {InteractiveMap} from './Map'
import {backend_url} from './util'
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
    axios.get(backend_url + "cities").then((res:any)=>{
      
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




function App() {
  return (
    <div >
        <Cities country = "Iraq"></Cities>
        <Params></Params>
        <InteractiveMap cities={["Abi Gharaq",
"Abu Dalf",
"Abu Ghraib",
"Agjalare",
"Akaika",
"Al-Abbasi",
"Al-Adel",
"Al-Ahrar",
"Al-Alam",
"Al-Amirya",
"Al-Atheem",
"Al-Ayadiya",
"Al-Aziz",
"Al-Aziziya",
"Al-Baghdady",
"Al-Bahhar",
"Al-Bashaer",
"Al-Battha'a",
"Al-Bdair",
"Al-Daghara",
"Al-Dair",
"Al-Dawaya",
"Al-Dujeel",
"Al-Duloeyah",
"Al-Duski",
"Al-Emam",
"Al-Esshaqi",
"Al-Fadhliya",
"Al-Fahama",
"Al-Fajer",
"Al-Fawwar",
"Al-Forat",
"Al-Fuhood",
"Al-Garma",
"Al-Gharraf",
"Al-Habbaniya",
"Al-Hafriya",
"Al-Hammar",
"Al-Haqlaniya",
"Al-Hartha",
"Al-Hassainya",
"Al-Haydariya",
"Al-Heera",
"Al-Hilal",
"Al-Howweir",
"Al-Huriya",
"Al-Iskandaria",
"Al-Islah",
"Al-Jadwal Al-Ghrabi",
"Al-Jisr",
"Al-Karabla",
"Al-Karrada Al-Sharqia",
"Al-Kifil",
"Al-Latifya",
"Al-Madhatiya",
"Al-Majd",
"Al-Mamoon",
"Al-Mansour",
"Al-Mansouriyah",
"Al-Mashroo",
"Al-Mihanawiya",
"Al-Mowafaqiya",
"Al-Msharah",
"Al-Muhamadath",
"Al-Multaka",
"Al-Muotasim",
"Al-Najmi",
"Al-Nashwa",
"Al-Nasr",
"Al-Nekhaeeb",
"Al-Obiadi",
"Al-Qahtanya",
"Al-Qairawan",
"Al-Qasim",
"Al-Qayarra",
"Al-Qosh",
"Al-Rahhaliya",
"Al-Rashad",
"Al-Rashdia",
"Al-Rasheed",
"Al-Riyadh",
"Al-Rummaneh",
"Al-Saadiya",
"Al-Sadeer",
"Al-Salam",
"Al-Saniya",
"Al-Shabaka",
"Al-Shafeia",
"Al-Shamal",
"Al-Shehamiya",
"Al-Shinafiya",
"Al-Shomaly",
"Al-Siba",
"Al-Sowair",
"Al-Synia",
"Al-Taji",
"Al-Tar",
"Al-Tarmiya",
"Al-Teeb",
"Al-Thagar",
"Al-Tharthar",
"Al-Wajihia",
"Al-Walid",
"Al-Warka",
"Al-Wihda",
"Al-Yousifya",
"Al-Zab",
"Al-Zubaidiya",
"Ali Al-Sharki",
"Altun Qupri",
"Ameraly",
"Atreesh",
"Baghdad Al-Jedeeda",
"Balak",
"Bardarash",
"Bartilla",
"Barwana",
"Barwari Bala",
"Barzan",
"Bashiqa",
"Bateel",
"Batifa",
"Bazian",
"Bebaz",
"Begeel",
"Beni Hasheem",
"Beni Saad",
"Beyara",
"Bitwana",
"Bradost",
"Buhriz",
"Cenkaw",
"Dercar",
"Diana",
"Dibaga",
"Dijla",
"Dinarta",
"Fayde",
"Garmat Beni Said",
"Ghammas",
"Gnareen",
"Gwyer",
"Haji Omaran",
"Hammam Al-Alil",
"Hamreen",
"Harir",
"Hero",
"Hibhib",
"Jabarra",
"Jalawla",
"Jassan",
"Jurf Al-Sakhar",
"Kadr Karam",
"Kanan",
"Karmak",
"Khailfan",
"Khoshnaw",
"Khourmal",
"Kubaisa",
"Kumait",
"Kurdsein",
"Lilan",
"Makkhoul",
"Mandali",
"Markaz Abu Al-Khaseeb",
"Markaz Afaq",
"Markaz Ain Al-Tamur",
"Markaz Al-Adhamiya",
"Markaz Al-Amadiya",
"Markaz Al-Baaj",
"Markaz Al-Basrah",
"Markaz Al-Chibayish",
"Markaz Al-Diwaniya",
"Markaz Al-Falluja",
"Markaz Al-Faw",
"Markaz Al-Hamdaniya",
"Markaz Al-Hamza",
"Markaz Al-Hawiga",
"Markaz Al-Hilla",
"Markaz Al-Hindiya",
"Markaz Al-Kadhimiya",
"Markaz Al-Kahla",
"Markaz Al-Karkh",
"Markaz Al-Khalis",
"Markaz Al-Khidhir",
"Markaz Al-Kufa",
"Markaz Al-Kut",
"Markaz Al-Mada'in",
"Markaz Al-Mahawil",
"Markaz Al-Mahmoudiya",
"Markaz Al-Maimouna",
"Markaz Al-Midaina",
"Markaz Al-Muqdadiya",
"Markaz Al-Najaf",
"Markaz Al-Nasiriya",
"Markaz Al-Noamaniya",
"Markaz Al-Qurna",
"Markaz Al-Ramadi",
"Markaz Al-Rifai",
"Markaz Al-Rumaitha",
"Markaz Al-Rutba",
"Markaz Al-Salman",
"Markaz Al-Shatra",
"Markaz Al-Shikhan",
"Markaz Al-Shirqat",
"Markaz Al-Suwaira",
"Markaz Al-Thawra",
"Markaz Al-Zubair",
"Markaz Ali Al-Gharbi",
"Markaz Ana",
"Markaz Aqra",
"Markaz Badra",
"Markaz Baladruz",
"Markaz Beygee",
"Markaz Chamchamal",
"Markaz Daquq",
"Markaz Derbendikhan",
"Markaz Dibis",
"Markaz Duhok",
"Markaz Erbil",
"Markaz Halabja",
"Markaz Hatra",
"Markaz Heet",
"Markaz Kalar",
"Markaz Kerbela",
"Markaz Khanaqin",
"Markaz Kifri",
"Markaz Kirkuk",
"Markaz Koysinjaq",
"Markaz Makhmour",
"Markaz Panjwin",
"Markaz Pshdar",
"Markaz Qalat Saleh",
"Markaz Rania",
"Markaz Rawanduz",
"Markaz Samarra",
"Markaz Sharbazher",
"Markaz Shat Al-Arab",
"Markaz Sinjar",
"Markaz Sumail",
"Markaz Telafar",
"Markaz Tilkaef",
"Markaz Tooz Khurmato",
"Markaz Zakho",
"Mawat",
"Mazouri Bala",
"Mergasur",
"Midan",
"Mirka",
"Namroud",
"Nawdasht",
"Nerwa Rekan",
"Outba",
"Qalaa't Ansab",
"Qalat Siker",
"Qara Tabe",
"Qaradagh",
"Qaraj",
"Qaratu",
"Qasruk",
"Qazanya",
"Qura Hanjeer",
"Qushtappa",
"Rabia",
"Rawa",
"Safwan",
"Said Dekhil",
"Salah Al-Din"]}></InteractiveMap>
    </div>
  );
}

export default App;
