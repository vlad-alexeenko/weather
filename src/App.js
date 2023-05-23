import { useState } from 'react';
import './App.css';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import CurrentWeather from './components/current-weather/current-weather';
import Search from './components/search/search';
import Footer from './components/footer/footer';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleOnChange = (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();

      setCurrentWeather({ city: searchData.label, ...weatherResponse});
    })
    .catch((err) => console.log(err));
  }

  console.log(currentWeather);

  return (
   <div className='container'>
    <div className='top-box'>{currentWeather && <CurrentWeather data={currentWeather} />}</div>
    <div className='bottom-box'><Search onSearchChange={handleOnChange} /></div>
    <Footer />
   </div>
  );
}

export default App;
