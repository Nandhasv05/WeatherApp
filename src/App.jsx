import { useEffect, useState } from 'react'
import './App.css'
import { CiSearch } from "react-icons/ci";
import PropTypes from "prop-types";

import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import humidtyIcon from "./assets/humidty.png";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.jfif";
import windIcon from "./assets/wind.png";

const WeatherDetails =({icon,temp,city,country,lat,log,humidty,wind})=>{
 return(
  <>
  <div className='image'>
  <img src={icon} alt="Image" />
  </div>
  <div className='temp'>{temp}*C</div>
  <div className='location'>{city}</div>
  <div className='country'>{country}</div>
  <div className='cord'>
    <div>
      <span className='lat'>latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidtyIcon} alt="humidty" className="icon" />
      <div className="data">
        <div className="humidty-percentage">{humidty}</div>
        <div className="text">Humidty</div>
      </div>
    </div>
    <div className="element">
      <img src={windIcon} alt="wind" className="icon" />
      <div className="data">
        <div className="wind-percentage">{wind}</div>
        <div className="text">Wind</div>
      </div>
    </div>
  </div>
  </>
 );
}

WeatherDetails.propTypes={
 icon: PropTypes.string.isRequired,
 temp: PropTypes.number.isRequired,
 city: PropTypes.string.isRequired,
 country: PropTypes.string.isRequired,
 humidty: PropTypes.string.isRequired,
 wind: PropTypes.number.isRequired,
 log: PropTypes.number.isRequired,
 lat: PropTypes.number.isRequired,
};

function App() {
  let api_key = "45da681f2677f5efb5b0533bdb038cf5";
  const [text,setText] =useState("Chennai");


  const [icon,setIcon]=useState(drizzleIcon);
  const[temp,setTemp]=useState(0);
  const[city,setCity]=useState("Chennai");
  const[country,setCountry]=useState("GB");
  const[lat,setLat]=useState(0);
  const[log,setLog]=useState(0);
  const[humidty,setHumidty]=useState(0);
  const[wind,setWind]=useState(0);
  const[cityNotFound,setCityNotFound]=useState(false);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);

  const weatheIconMap ={
    "01d" : clearIcon,
    "01n" : clearIcon,
    "02d" : cloudIcon,
    "02n" : cloudIcon,
    "03d" : drizzleIcon,
    "03n" : drizzleIcon,
    "04d" : drizzleIcon,
    "04n" : drizzleIcon,
    "09d" : rainIcon,
    "09n" : rainIcon,
    "10d" : rainIcon,
    "10n" : rainIcon,
    "13d" : snowIcon,
    "13n" : snowIcon,
  };

  const search = async ()=>{
      let url =` https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
      try {
        let res = await fetch(url)
        let data =await res.json();
        if(data.cod === "404"){
          console.error("City not found")
          setCityNotFound(true);
          setLoading(false);
          return
        }
        setHumidty(data.main.humidity);
        setWind(data.wind.speed);
        setTemp(Math.floor(data.main.temp));
        setCity(data.name);
        setCountry(data.sys.country);
        setLat(data.coord.lat);
        setLog(data.coord.lon);
        const weatheIconcode = data.weather[0].icon;
        setIcon(weatheIconMap[weatheIconcode] || clearIcon);
        setCityNotFound(false);
      }catch (error) {
        console.error("An error occurred:", error.message);
        setError("An error occured while fecting weather data..")
      }finally{
        setLoading(false)
      }
     };
const handleCity =(e) =>{
  setText(e.target.value);
};
const handleKeyDown =(e) =>{
  if(e.key === "Enter"){
    search();
  }
}
useEffect(function (){
  search();
},[]);
  return (
    <>
     <div className='container'>
     <div className='input-container'>
      <input type="text" className='cityInput' placeholder='Search City' onChange={handleCity}
      value={text} onKeyDown={handleKeyDown}/>
      <div className='search-icon' onClick={() => search()}> <CiSearch /></div>
     </div>
     
     {loading && <div className="loading-message">Loading....</div>}
     {error && <div className="error-message">{error}</div>}
     {cityNotFound && <div className="city-not-found">City not found..</div>}

    {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidty={humidty}
     wind={wind} />}
     <p className="copyright">
      Designed By <span>Nandhakumar Sukumaran</span>
     </p>
     </div>
    </>
  )
}

export default App
