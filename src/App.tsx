import { log } from "console";
import "./App.css";
import { useEffect, useState } from "react";
// 07a92f5fb756a201a6c5d7822a16965b - APIkey
// lat = 57.62987 lon = 39.87368
// type weatherObject = {
//   weather: ,
//   description: string
// };
// console.log(new Date(Date.UTC(2012, 11, 20, 3, 0, 0)));
function App(): JSX.Element {
  const [cityInfo, setCityInfo] = useState<string>("");
  const [weatherInfo, setWeatherInfo] = useState<any>({ weather: [{ description: "none" }], sys: { sunrise: 10 } });
  const [sunInfo, setSunInfo] = useState<Array<string>>(["", ""]);
  function dataFetch(): void {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInfo.split(" ")[0]},${cityInfo.split(" ")[1]}&appid=07a92f5fb756a201a6c5d7822a16965b`)
      .then((file) => file.json())
      .then((c_info) => {
        // cityCords = [c_info[0].lat, c_info[0].lon];
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${c_info[0].lat}&lon=${c_info[0].lon}&lang=ru&appid=07a92f5fb756a201a6c5d7822a16965b`)
          .then((file) => file.json())
          .then((w_info) => {
            console.log(w_info);
            setWeatherInfo(w_info);
            let sunriseDate = new Date(w_info.sys.sunrise * 1000);
            let sunsetDate = new Date(w_info.sys.sunset * 1000);
            setSunInfo([sunriseDate.getHours() + " : " + sunriseDate.getMinutes(), sunsetDate.getHours() + " : " + sunsetDate.getMinutes()]);
          });
      });
  }

  return (
    <div>
      <input onChange={(e) => setCityInfo(e.target.value)}></input>
      <button onClick={() => dataFetch()}></button>
      <p>{sunInfo[0]} "rise"</p>
      <p>{sunInfo[1]} "set"</p>
    </div>
  );
}

export default App;
