import "./App.css";
import { useEffect, useState } from "react";
// 07a92f5fb756a201a6c5d7822a16965b - APIkey
// lat = 57.62987 lon = 39.87368
// type weatherObject = {
//   weather: ,
//   description: string
// };
// console.log(new Date(Date.UTC(2012, 11, 20, 3, 0, 0)));
type PropsCityCard = {
  sun: {
    sunrise: string;
    sunset: string;
  };
};
function App(): JSX.Element {
  const [cityName, setCityName] = useState<string>("");
  const [citiesMass, setCitiesMass] = useState<PropsCityCard[]>([]);
  useEffect(() => dataFetch("Ярославль"), []);
  function dataFetch(cityInfo: string): void {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInfo.split(" ")[0]},${cityInfo.split(" ")[1]}&appid=07a92f5fb756a201a6c5d7822a16965b`)
      .then((file) => file.json())
      .then((c_info) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${c_info[0].lat}&lon=${c_info[0].lon}&lang=ru&appid=07a92f5fb756a201a6c5d7822a16965b`)
          .then((file) => file.json())
          .then((w_info) => {
            console.log(w_info);
            let sunriseDate = new Date(w_info.sys.sunrise * 1000);
            let sunsetDate = new Date(w_info.sys.sunset * 1000);
            let citiesMassSlice = citiesMass.slice();
            let pushingInfo = {
              sun: {
                sunrise: sunriseDate.getHours() + " : " + sunriseDate.getMinutes(),
                sunset: sunsetDate.getHours() + " : " + sunsetDate.getMinutes(),
              },
            };
            citiesMassSlice.push(pushingInfo);
            setCitiesMass(citiesMassSlice);
          });
      });
  }
  let cities = citiesMass.map((city, index) => {
    return <CityCard {...city} key={index} />;
  });
  return (
    <div className="mainWrap">
      <div className="cityInputWrap">
        <input className="cityInput" onChange={(e) => setCityName(e.target.value)}></input>
        <button className="cityInputButton" onClick={() => dataFetch(cityName)}></button>
      </div>
      <div>{cities}</div>
    </div>
  );
}

function CityCard({ sun }: PropsCityCard): JSX.Element {
  return (
    <div className="cityCard">
      <p>{sun.sunrise}</p>
      <p>{sun.sunset}</p>
    </div>
  );
}
export default App;
