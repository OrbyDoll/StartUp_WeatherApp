import "./App.css";
import { useEffect, useState } from "react";
import { createFetch, getUrlData, getUrlGeo, getUrlForecast, getImgUrl } from "./helpers";
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
    img: string;
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
    timezone: number;
  };
};

function CityCard({ sun, city, geo }: PropsCityCard): JSX.Element {
  const [selectOption, setSelectOption] = useState<string>("temp");
  const [scrollValue, setScrollValue] = useState<number>(0);
  const [forecastData, setForecastData] = useState<any>([]);
  // const [forecastMenu, setForecastMenu] = useState<JSX.Element>(<div></div>);
  function renderTempMenu(): JSX.Element {
    if (!forecastData.length) {
      return <></>;
    }

    let tempMenu = forecastData[Math.floor(scrollValue / 25) * -1].map((timepoint: any) => {
      return (
        <div className="tempMenuItem">
          <p>{timepoint.main.time}</p>
          <img src={getImgUrl(timepoint.main.icon)} alt="img" />
          <p>{timepoint.main.temp}°</p>
        </div>
      );
    });
    return <div className="tempMenu">{tempMenu}</div>;
  }
  let forecastMenu = <p></p>;
  switch (selectOption) {
    case "temp":
      forecastMenu = renderTempMenu();
  }
  useEffect(() => {
    const urlForecast = getUrlForecast({ lat: geo.lat, lon: geo.lon });
    createFetch(urlForecast).then((res) => {
      console.log(res);

      const forecastMass = res.list;
      let pushingInfo: any[][] = [[]];
      for (let i = 0; i < forecastMass.length; i++) {
        let timestampData = {
          main: {
            temp: Math.floor(forecastMass[i].main.temp - 273.15),
            icon: forecastMass[i].weather[0].icon,
            time: new Date(forecastMass[i].dt * 1000).getHours(),
            day: new Date(forecastMass[i].dt * 1000).getDay() - 1,
          },
        };
        if (i == 0) {
          pushingInfo[pushingInfo.length - 1].push(timestampData);
        } else if (new Date((forecastMass[i].dt - 10800 + geo.timezone) * 1000).getDay() == new Date(forecastMass[i - 1].dt * 1000).getDay()) {
          pushingInfo[pushingInfo.length - 1].push(timestampData);
        } else {
          pushingInfo.push([]);
          pushingInfo[pushingInfo.length - 1].push(timestampData);
        }
      }
      setForecastData(pushingInfo);
    });
  }, []);
  let weekDays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let weekDaysWrap = forecastData.length ? (
    forecastData.map((item: any, index: number) => {
      return <p>{weekDays[item[0].main.day]}</p>;
    })
  ) : (
    <p></p>
  );

  return (
    <div className="cityCard">
      <p className="cityName">{city.name}</p>
      <p className="cityTemp">{city.temp}°</p>
      <p className="cityTempDesc">{city.desc}</p>
      <img src={sun.img} />
      <div className="cityPanel">
        <div className="cityPanelMenu">
          <div className="dataSelectMenu">
            <div className="daySelect">
              <div
                className="daySelect_in"
                onWheel={(e) => {
                  console.log(e.deltaY);

                  if ((scrollValue < 0 || Math.sign(e.deltaY) != 1) && (scrollValue > -100 || Math.sign(e.deltaY) != -1)) {
                    setScrollValue((then) => then + 25 * Math.sign(e.deltaY));
                  }
                }}
                style={{ top: `${scrollValue}px` }}
              >
                {weekDaysWrap}
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
        {forecastMenu}
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
            img: getImgUrl(weatherInfo.weather[0].icon),
          },
          city: {
            name: weatherInfo.name,
            temp: Math.floor(weatherInfo.main.temp - 273),
            desc: descr,
          },
          geo: {
            lat: weatherInfo.coord.lat,
            lon: weatherInfo.coord.lon,
            timezone: weatherInfo.timezone,
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

export default App;
