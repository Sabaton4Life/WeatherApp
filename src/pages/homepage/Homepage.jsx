import React, { useRef, useState } from 'react'
import './Homepage.css'
import search_icon from '../../assets/search.png'
import clear_icon from '../../assets/clear.png'
import cloud_icon from '../../assets/cloud.png'
import drizzle_icon from '../../assets/drizzle.png'
import humidity_icon from '../../assets/humidity.png'
import rain_icon from '../../assets/rain.png'
import snow_icon from '../../assets/snow.png'
import wind_icon from '../../assets/wind.png'
import RequestHelper from '../../components/RequestHelper'
import { useEffect } from 'react'

const Homepage = () => {
    const inputRef = useRef()
    const modifyRef = useRef()
    const [weatherData, setWeatherData] = useState(false);
    const [cityList, setCityList] = useState([]);

    const allIcons = {
        '01d': clear_icon,
        '01n': clear_icon,
        '02d': cloud_icon,
        '02n': cloud_icon,
        '03d': cloud_icon,
        '03n': cloud_icon,
        '04d': drizzle_icon,
        '04n': drizzle_icon,
        '09d': rain_icon,
        '09n': rain_icon,
        '10d': rain_icon,
        '10n': rain_icon,
        '13d': snow_icon,
        '13n': snow_icon
    }

    const saveCity = () => {
        RequestHelper("http://localhost:8080").POST(
            "/city",
            {},
            {
                cityName:inputRef.current.value
            },
            (data, error) => {
                console.log(data.data)
            }
        )
    }

    const deleteCity = (city) => {
        RequestHelper("http://localhost:8080").DELETE(
            "/city",
            {},
            {
                cityName: city
            },
            (data, error) => {
                console.log(data.data);
            }
        )
    }

    const modifyCity = (oldCityName, newCityName) => {
        RequestHelper("http://localhost:8080").PUT(
            "/city",
            {},
            {
                previousName: oldCityName,
                newName: modifyRef.current.value
            },
            (data, error) => {
                console.log(data.data);
            }
        )
    }

    useEffect(() => {
        RequestHelper("http://localhost:8080").GET(
            "/city",
            {},
            (data, error) => {
                setCityList(data.data)
            })
    }, [])

    const search = async (city) => {

        try {
            if (city === '') {
                alert('Please enter a city');
                return;
            }
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false);
            console.error('Error in fetching weather data!');
        }
    }
    return (
        <div className='weather'>
            <div className='search-bar'>
                <input className='search-bar__input' ref={inputRef} placeholder='search' />
                <img className='search-bar__img' src={search_icon} alt='' onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ? <>
                <img src={weatherData.icon} alt='' className='weather-icon' />
                <p className='temperature'>{weatherData.temperature}°C</p>
                <p className='location'>{weatherData.location}</p>
                <div className='weather-data'>
                    <div className='weather-data__column'>
                        <img className='weather-data__column__img ' src={humidity_icon} alt='' />
                        <div>
                            <p>{weatherData.humidity}%</p>
                            <span className='weather-data__column__span'>Humidity</span>
                        </div>
                    </div>
                    <div className='weather-data__column'>
                        <img className='weather-data__column__img ' src={wind_icon} alt='' />
                        <div>
                            <p>{weatherData.windSpeed} Km/H</p>
                            <span className='weather-data__column__span' >Wind Speed</span>
                        </div>
                    </div>
                </div>
                <button className='save-city' onClick={saveCity}>Save City</button>
            </> : <>

            </>}
            <div className='city-list-wrapper'>
                <p className='city-list-wrapper__title'>Saved cities</p>
                <ul className='city-list'>
                    {cityList.map((city) => (
                        <div>
                            <li className='city-list__item'>
                                <input className="city-list__item__input" placeholder={city} ref={modifyRef} disabled={false}/>
                                <div className='city-list__weather-data'>
                                    {weatherData.temperature}°C
                                    <img className="city-list__weather-data__icon" src={weatherData.icon} />
                                </div>
                                <div className='buttons'>
                                    <button className='city-list__item__button' onClick={() => deleteCity(city)}>Delete</button>
                                    <button className='city-list__item__button' onClick={()=> modifyCity(city, 'Bucharest')}>Modify</button>
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Homepage