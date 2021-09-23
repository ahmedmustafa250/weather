import './App.css';
import axios from 'axios';
import {useState,useEffect} from 'react';
import Cloud from "./img/cloudy.png"
import Snow from "./img/snowflake.png"
import Rain from "./img/rainy.png"
import Thunderstorm from "./img/thunderstorm.png"
import Drizzle from "./img/drizzle.png"
import Haze from "./img/haze.png"
import Mix from "./img/mix.png"
import Day from "./img/sun.png"
import Night from "./img/moon.png"


function App() {

  const [city,newcity]=useState('Karachi')




  const [cityname, setcityname] = useState("Karachi");
  const [countryname, setcountryname] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [feeltemperature, setfeelTemperature] = useState(0);
  const [humidty, sethumidity] = useState(0);
  const [pressure, setpressure] = useState(0);
  const [visibility, setvisibility] = useState(0);
  const [weather, setWeather] = useState("");
  const [time, settime] = useState(0);
  



  function assign(){
    let inputData= document.getElementById("input").value
     inputData=inputData.slice(0,1).toUpperCase()+inputData.slice(1)
    document.getElementById("input").value=""
    newcity(inputData)
  }
  

  useEffect(()=>{
    const fetchApi=async()=>{
      // console.log("mein use effect hoon")
     axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f65942a1cb2830e766294f420ba76e12`)
      .then((res)=>{
          setcityname(res.data.name)
          setcountryname(res.data.sys.country)
          setTemperature(Math.floor((res.data.main.temp)-273)+"'C")
          setfeelTemperature(Math.floor((res.data.main.feels_like)-273)+"'C")
          sethumidity(res.data.main.humidity)
          setpressure(res.data.main.pressure+" hpa")
          setvisibility((res.data.visibility)/1000+ " Km/h")
          setWeather(res.data.weather[0].main)
          settime(res.data.timezone)
      })
      .catch(function(err){
          alert("Not found !")
      })
    }
    fetchApi()
})
const timeBuilder = (d) =>{
  // console.log("time zone", d)
  var current = new Date()
  var localTime = current.getTime()
  var localOffset = current.getTimezoneOffset() * 60000
  var utc = localTime + localOffset
  var cite = utc + (1000 * parseInt(d))
  var nd = new Date(cite)
  var hours = nd.getHours()
  var minutes = nd.getMinutes()
  
  return nd.toTimeString()

}

 let t =timeBuilder(time)

let source;
  switch(weather){
    case "Clouds":
      source=Cloud
      break
    case "Smoke":
      source=Cloud
      break
    case "Fog":
      source=Cloud
      break
    case "Rain":
      source=Rain
      break
    case "Snow":
      source=Snow
      break
    case "Thunderstorm":
      source=Thunderstorm
      break
    case "Drizzle":
      source=Drizzle
      break
    case "Haze":
      source=Haze
      break
    case "Mist":
      source=Mix
      break
    case "Dust":
      source=Mix
      break
    case "Sand":
      source=Mix
      break
    case "Ash":
      source=Mix
      break
    case "Squall":
      source=Mix
      break
    case "Tornado":
      source=Mix
      break
    default:
      if((t.slice(0,2))>=19){
        source=Night
      }
      else{
        source=Day
      }

  }

  return (
     <div className="main" >
          <div style={{textAlign:"center"}}> 
                <input type="text" id="input" placeholder="City" className="input" text/>
                <button className="search" onClick={assign} >Search</button>
               
          </div>
          <div className="common" style={{borderTop:"none" ,borderBottom:"none"}}>
              <div><h1 className="text">{cityname+","+countryname}</h1></div>
              <div>
                <img src={source} alt={Cloud} style={{width:'150px',height:'100px'}}/>
              </div>
          </div>
          <div  className="common" style={{borderTop:"none",marginTop:'-30px'}}> 
              <div ><h1 className="text">Time</h1></div>
              <div><h1 className="text">{t.slice(0,8)}</h1></div>
          </div>
          <div className="common">
              <div> <p className="text">Weather</p></div>
              <div> <p className="text">{weather}</p></div>
             
          </div>
          <div className="common">
             <div> <p className="text">Temperature</p></div>
              <div> <p className="text">{temperature}</p></div>
          </div>
          <div className="common">
              <div> <p className="text">Feel Likes</p></div>
              <div> <p className="text">{feeltemperature}</p></div>
          </div>
          <div className="common">
              <div> <p className="text">Humidity</p></div>
              <div> <p className="text">{humidty}</p></div>
          </div>
          <div className="common">
              <div> <p className="text">Pressure</p></div>
              <div> <p className="text">{pressure}</p></div>
          </div>
          <div className="common">
              <div> <p className="text">Visibility</p></div>
              <div> <p className="text">{visibility}</p></div>
          </div>
    </div>
  );
}

export default App;
