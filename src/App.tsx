import "./App.css";
import { useEffect, useState } from "react";
import { createFetch, getUrlData, getUrlGeo } from "./helpers";
import { getImage } from "./getImage";
// 07a92f5fb756a201a6c5d7822a16965b - APIkey
// lat = 57.62987 lon = 39.87368
// type weatherObject = {
//   weather: ,
//   description: string
// };
// https://say-hi.me/design/7-primerov-krutogo-ui-dlya-prilozhenij-pogody.html - Макет
// https://openweathermap.org/forecast5 - 5 дней по 3 часа
type PropsCityCard = {
  sun: {
    sunrise: string;
    sunset: string;
  };
  city: {
    name: string;
    temp: number;
    desc: string;
  };
};

function CityCard({ sun, city }: PropsCityCard): JSX.Element {
  return (
    <div className="cityCard">
      <p className="cityName">{city.name}</p>
      <p className="cityTemp">{city.temp}°</p>
      <p className="cityTempDesc">{city.desc}</p>
      <div className="cityPanel">
        <div className="cityPanelMenu">
          <select className="dataSelect">
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
          </select>
          <div>{getImage("temp")}</div>
        </div>
      </div>
    </div>
  );
}

function App(): JSX.Element {
  const [cityName, setCityName] = useState<string>("");
  const [citiesMass, setCitiesMass] = useState<PropsCityCard[]>([]);

  const dataFetch = async (cityInfo: string): Promise<void> => {
    const urlGeo = getUrlGeo(cityInfo);

    createFetch(urlGeo).then((res) => {
      const urlData = getUrlData(res[0]);

      createFetch(urlData).then((weatherInfo) => {
        console.log(weatherInfo);

        const sunriseDate = new Date((weatherInfo.sys.sunrise - 10800 + weatherInfo.timezone) * 1000);
        const sunsetDate = new Date((weatherInfo.sys.sunset - 10800 + weatherInfo.timezone) * 1000);
        let descr = weatherInfo.weather[0].description;
        descr = descr[0].toUpperCase() + descr.substring(1, descr.length);
        let formatter = new Intl.DateTimeFormat("ru", {
          hour: "2-digit",
          minute: "2-digit",
        });
        //sunriseDate.getHours() + " : " + sunriseDate.getMinutes()
        //sunsetDate.getHours() + " : " + sunsetDate.getMinutes()
        let prevState = [...citiesMass];
        const pushingInfo = {
          sun: {
            sunrise: formatter.format(sunriseDate),
            sunset: formatter.format(sunsetDate),
          },
          city: {
            name: weatherInfo.name,
            temp: Math.floor(weatherInfo.main.temp - 273),
            desc: descr,
          },
        };
        prevState.push(pushingInfo);
        setCitiesMass(prevState);
      });
    });
  };

  useEffect(() => {
    dataFetch("Ярославль");
  }, []);

  return (
    <div className="mainWrap">
      <div className="cityInputWrap">
        <input className="cityInput" onChange={(e) => setCityName(e.target.value)}></input>
        <button className="cityInputButton" onClick={() => dataFetch(cityName)}>
          Search
        </button>
      </div>
      <div className="cityCardWrap">
        {citiesMass.map((city, index) => {
          return <CityCard {...city} key={index} />;
        })}
      </div>
    </div>
  );
}
//<ion-icon name="thermometer-outline"></ion-icon>
//<ion-icon name="sunny-outline"></ion-icon>

fetch("https://api.openweathermap.org/data/2.5/forecast?lat=57.62987&lon=39.87368&cnt=50&appid=07a92f5fb756a201a6c5d7822a16965b")
  .then((file) => file.json())
  .then((data) => console.log(data));
export default App;
//
