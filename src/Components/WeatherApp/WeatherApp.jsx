import React from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
import axios from 'axios'
import { useState } from 'react'

export const WeatherApp = () => {

    let apiKey = 'de87b55d70743a838c9fcebdb588db0e';

    const[weatherData, setWeatherData] = useState({
        humidity: '', 
        wind:'',
        temperature:'',
        location:''
    })

    const[wicon, setWicon] = useState(cloud_icon);



    const search = async ()=>{
        const element = document.getElementsByClassName("cityInput")

        if(element[0].value===""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value},&units=Metric&APPID=${apiKey}`
        axios.get(url)
        .then(
            (response)=>{
                console.log(response.data.weather[0].icon);
                setWeatherData(
                    {
                        humidity: response.data.main.humidity, 
                        wind: response.data.wind.speed,
                        temperature: response.data.main.temp,
                        location:response.data.name
                    }

                )
                if(response.data.weather[0].icon == "01n" || response.data.weather[0].icon == "01d"){
                    setWicon(clear_icon)
                }
                else if(response.data.weather[0].icon == "02d" || response.data.weather[0].icon == "02n"){
                    setWicon(cloud_icon)
                }
                else if(response.data.weather[0].icon == "09d" || response.data.weather[0].icon == "09n"){
                    setWicon(drizzle_icon)
                }

                else if(response.data.weather[0].icon == "10d" || response.data.weather[0].icon == "10n"){
                    setWicon(rain_icon)
                }

                else if(response.data.weather[0].icon == "13d" || response.data.weather[0].icon == "13n"){
                    setWicon(snow_icon)
                }
                
            }
        )
        .catch(
            (error)=>{
                console.log("Error Ocurred!")
            }
        )
    }
    return (
        <div className='container' >
            <div className="top-bar">
                <input type="text" placeholder='search' className="cityInput" />
                <div className="search-icon" >
                    <img src={search_icon} onClick={()=>search()} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">{weatherData.temperature}</div>
            <div className="weather-location">{weatherData.location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.humidity}</div>
                        <div className="text"></div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">{weatherData.wind}</div>
                        <div className="text"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

