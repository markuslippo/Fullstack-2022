import axios from 'axios'
import React, { useEffect, useState } from 'react'

const api_key = process.env.REACT_APP_API_KEY

const Listcountry = ({country, selectCountry}) => {
    return(
        <li>
        {country.name.common}
        <button onClick={selectCountry}>show</button>
        </li>
    )
}

const Countrydetails = ({country}) => {
    const [weather, setWeather] = useState({})

    const hook = () => { 
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
            .then(response => {
                setWeather(response.data)
              })
          }
    useEffect(hook, [])
          
    return(
    <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>

        <h3>languages</h3>
        <ul>
            {Object.keys(country.languages).map(key =>
            <li key={key} >{country.languages[key]} </li>
            )}
        </ul>
        <img src={country.flags.png} />
        

        <h2>Weather in {country.capital}</h2>
        {
            (weather.wind !== undefined && weather.main !== undefined && weather.weather !== undefined) 
            ? 
            <p>
            temperature {weather.main.temp} Celsius <br></br>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /> <br></br>
            wind {weather.wind.speed} m/s
            </p>
            : 
            <p>Error in loading weather info</p>
        }
    </div>
    )
}

const Content = ({countries, selected, selectCountry}) => { 

    if(selected !== undefined) {
        return(
        <div>
            <Countrydetails country={selected} />
        </div>
        )
    } else if(countries.length > 10) {

        return(
        <div>Too many matches, try another filter</div>
        )
    } else if(countries.length === 1) {
        return(
        <Countrydetails country={countries[0]} />
        )

    }else if(countries.length === 0) {
        return(
        <div>No matches, try another filter</div>
        )
    } else {
        return(
        <div>
            {countries.map(country =>
            <Listcountry
                 key={country.name.official}
                 country={country} 
                 selectCountry={() => selectCountry(country.name.common)}
                />
                )}
        </div>
        )
    }
}

export default Content