const apiKey = "Your_API_KEY"
document.getElementById('location-form').addEventListener('submit', getWeather);

function getWeather(e) {
  //Write you code logic here
  e.preventDefault()
  const input = document.getElementById("location-input")
  const location=input.value.trim()
  input.value="";
  const weather = document.getElementById("weather-data")
  
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`,{
      method:"GET"
    }).then((res)=>{
      if(!res.ok){
        throw new Error("City not found")
      }
      return res.json();
    })
    .then((data)=>{
      weather.innerHTML = `<h2 style=font-size:40px;margin-bottom:10px>${data.name}</h2>
                <p style=font-size:28px; font-weight:100>${data.weather[0].main}</p>
                <p style=font-size:30px; font-weight:100>${data.main.temp} °C</p>`
      
    })
    .catch(()=>{
        weather.innerHTML = "Error: City not found"
    })
  
  // Error should be very specific
  }
  // Error: Failed to fetch weather data,   should always fetch this error in case of any failure otherwise you test cases will get failed.
  