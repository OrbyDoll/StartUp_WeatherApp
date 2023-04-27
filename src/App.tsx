import "./App.css";
import { useEffect, useState } from "react";
import { createFetch, getUrlData, getUrlGeo } from "./helpers";
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

function CityCard({ sun }: PropsCityCard): JSX.Element {
  return (
    <div className="cityCard">
      <p>{sun.sunrise}</p>
      <p>{sun.sunset}</p>
    </div>
  );
}

function App(): JSX.Element {
  const [cityName, setCityName] = useState<string>("");
  const [citiesMass, setCitiesMass] = useState<PropsCityCard[]>([]);

  const dataFetch = (cityInfo: string): void => {
    const urlGeo = getUrlGeo(cityInfo);

    createFetch(urlGeo).then((res) => {
      const urlData = getUrlData(res);

      createFetch(urlData).then((weatherInfo) => {
        console.log(weatherInfo);

        const sunriseDate = new Date(weatherInfo.sys.sunrise * 1000);
        const sunsetDate = new Date(weatherInfo.sys.sunset * 1000);

        setCitiesMass((prevState) => {
          const pushingInfo = {
            sun: {
              sunrise:
                sunriseDate.getHours() + " : " + sunriseDate.getMinutes(),
              sunset: sunsetDate.getHours() + " : " + sunsetDate.getMinutes(),
            },
          };

          prevState.push(pushingInfo);
          return prevState;
        });
      });
    });
  };

  useEffect(() => dataFetch("Ярославль"), []);

  return (
    <div className="mainWrap">
      <div className="cityInputWrap">
        <input
          className="cityInput"
          onChange={(e) => setCityName(e.target.value)}
        ></input>
        <button
          className="cityInputButton"
          onClick={() => dataFetch(cityName)}
        ></button>
      </div>
      <div>
        {citiesMass.map((city, index) => {
          return <CityCard {...city} key={index} />;
        })}
      </div>
    </div>
  );
}
export default App;
