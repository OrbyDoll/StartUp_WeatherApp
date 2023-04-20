import "./App.css";
import { useState } from "react";
// 07a92f5fb756a201a6c5d7822a16965b - APIkey
// lat = 57.62987 lon = 39.87368
function App(): JSX.Element {
  const [cityInfo, setCityInfo] = useState<string>("");
  return (
    <div>
      <input onChange={(e) => setCityInfo(e.target.value)}></input>
      <button
        onClick={() => {
          fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInfo.split(" ")[0]},${cityInfo.split(" ")[1]}&appid=07a92f5fb756a201a6c5d7822a16965b`)
            .then((file) => file.json())
            .then((info) => console.log(info));
        }}
      ></button>
      <p></p>
    </div>
  );
}

export default App;
