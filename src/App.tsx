import "./App.css";
import { useEffect, useState } from "react";
import { createFetch, getUrlData, getUrlGeo, getUrlForecast } from "./helpers";
import { getImage } from "./getImage";
// 07a92f5fb756a201a6c5d7822a16965b - APIkey
// lat = 57.62987 lon = 39.87368
// type weatherObject = {
//   weather: ,
//   description: string
// };
// https://openweathermap.org/forecast5 - 5 дней по 3 часа
// https://say-hi.me/design/7-primerov-krutogo-ui-dlya-prilozhenij-pogody.html - Макет
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
  geo: {
    lat: number;
    lon: number;
  };
};

function CityCard({ sun, city, geo }: PropsCityCard): JSX.Element {
  const [selectOption, setSelectOption] = useState<string>("temp");
  const [scrollValue, setScrollValue] = useState<number>(0);
  const [forecastData, setForecastData] = useState<any>([]);

  useEffect(() => {
    const urlForecast = getUrlForecast({ lat: geo.lat, lon: geo.lon });
    createFetch(urlForecast).then((res) => {
      let pushingInfo: any[][] = [[]];
      for (let i = 0; i < res.list.length; i++) {
        let timestampData = {
          main: {
            temp: Math.floor(res.list[i].main.temp - 273.15),
            icon: res.list[i].weather.icon,
            time: new Date(res.list[i].dt * 1000).getHours(),
          },
        };
        if (i == 0) {
          pushingInfo[0].push(timestampData);
        } else if (new Date(res.list[i].dt * 1000).getDay() == new Date(res.list[i - 1].dt * 1000).getDay()) {
          pushingInfo[0].push(timestampData);
        } else {
          pushingInfo.push([]);
          pushingInfo[pushingInfo.length - 1].push(timestampData);
        }
      }
      console.log(pushingInfo);
    });
  }, []);
  return (
    <div className="cityCard">
      <p className="cityName">{city.name}</p>
      <p className="cityTemp">{city.temp}°</p>
      <p className="cityTempDesc">{city.desc}</p>
      <div className="cityPanel">
        <div className="cityPanelMenu">
          <div className="dataSelectMenu">
            <div className="daySelect">
              <div
                className="daySelect_in"
                onWheel={(event) => {
                  console.log(Math.sign(event.deltaY));

                  if ((scrollValue < 0 || Math.sign(event.deltaY) != 1) && (scrollValue > -100 || Math.sign(event.deltaY) != -1)) {
                    setScrollValue((then) => then + (1 * event.deltaY) / 50);
                  }
                }}
                style={{ top: `${scrollValue}px` }}
              >
                <p>Mon</p>
                <p>Tue</p>
                <p>Wed</p>
                <p>Thur</p>
                <p>Fri</p>
              </div>
            </div>
            <div className="svgContainer">
              <div onClick={() => setSelectOption("temp")}>{getImage("temp")}</div>
              <div onClick={() => setSelectOption("sun")}>{getImage("sun")}</div>
              <div onClick={() => setSelectOption("weather")}>{getImage("weather")}</div>
            </div>
          </div>
          <div className="line"></div>
        </div>
        {/* <div className="infoMenu"></div> */}
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
          geo: {
            lat: weatherInfo.coord.lat,
            lon: weatherInfo.coord.lon,
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
