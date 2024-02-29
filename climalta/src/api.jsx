import React, {useState, useEffect} from 'react'

function ApiJs(){
    //console.log("atualizei")
    const [altNuvens, SetAltNuvens] = useState(null)
    const [cidade, SetCidade] = useState(null)
    const [país, SetPaís] = useState(null)
    const [tempMax, SetTempMax] = useState(null)
    const [tempMin, SetTempMin] = useState(null)
    const [umidade, SetUmid] = useState(null)
    const [Rweather, SetWeather] = useState(null)
    const [RealWeather, SetRealWeather] = useState(null)
    const [Swind, SetWind] = useState(null)
    const [count, setCount] = useState(0)
    const urlIcon = `https://openweathermap.org/img/wn/${Rweather}@2x.png`

    setInterval((altNuvens, cidade, país, temp_max, temp_min, umidade, Rweather, RealWeather,count) => {

        navigator.geolocation.getCurrentPosition(async (position) => {
            //coord, weather, base, main, visibility, wind, clouds, dt, sys, timezone, id, name, cod
            const {latitude, longitude} = position.coords;
            const apiKey = 'b923ae916e3afad1ee80ff39d3ac6d08'
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br`
            //console.log(longitude, latitude, "lattt")
            fetch(apiUrl)
            .then(response =>{
                if(!response.ok){
                    console.log('erro')
                }
                return response.json();
            })
            .then(data => {
                SetAltNuvens(data.clouds.all)
                //console.log("data: ", data)
                SetCidade(data.name)
                SetPaís(data.sys.country)
                SetUmid(data.main.humidity)
                SetTempMax(data.main.temp_max)
                SetTempMin(data.main.temp_min)
                SetWeather(data.weather[0].icon)
                SetRealWeather(data.weather[0].description)
                SetWind(data.wind.speed)
            }).catch(error => {
                console.log('deu erro: ', error)
            })
        
            
        })
    }, 5000)

    return(
        <div className='main'>
            <div>
                <nav>
                    <ul>
                        <li><a href="https://www.instagram.com/usuario_progamador?igsh=ZG9tMTFncG9lbGl0">@usuario_progamador</a></li>
                    </ul>
                </nav>
            </div>

            <div className='header'>
                <h1>{cidade}</h1>
                <h1>{país}</h1>
            </div>
            <img src={urlIcon} alt=""/>
            <h1>{RealWeather}</h1>

            <div className='temp'>
                <h1>Max: {Math.round(tempMax)} &#8451;</h1>
                <h1>Min: {Math.round(tempMin)} &#8451;</h1>                
            </div>

            <div className='others'>
                <h1>Nebulosidade: {altNuvens}% </h1>
                <h1>Humidade: {umidade}</h1>
            </div>
            <h1>Vento: {Swind} km/h</h1>
            <footer>
                <p>&copy; 2024 - usuario_progamador</p>
            </footer>

        </div>
    )
}

export default ApiJs;