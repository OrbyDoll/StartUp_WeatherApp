import "./App.css";
import { useState } from "react";
// 07a92f5fb756a201a6c5d7822a16965b - APIkey
// lat = 57.62987 lon = 39.87368
// type weatherObject = {
//   weather: ,
//   description: string
// };
function App(): JSX.Element {
  const [cityInfo, setCityInfo] = useState<string>("");
  const [weatherInfo, setWeatherInfo] = useState<any>({ weather: { description: "none" } });
  return (
    <div>
      <input onChange={(e) => setCityInfo(e.target.value)}></input>
      <button
        onClick={() => {
          fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInfo.split(" ")[0]},${cityInfo.split(" ")[1]}&appid=07a92f5fb756a201a6c5d7822a16965b`)
            .then((file) => file.json())
            .then((c_info) => {
              // cityCords = [c_info[0].lat, c_info[0].lon];
              fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${c_info[0].lat}&lon=${c_info[0].lon}&lang=ru&appid=07a92f5fb756a201a6c5d7822a16965b`)
                .then((file) => file.json())
                .then((w_info) => {
                  console.log(w_info);
                  setWeatherInfo(w_info);
                });
            });
        }}
      ></button>
      <p>{weatherInfo.weather[0].description}</p>
    </div>
  );
}

export default App;
