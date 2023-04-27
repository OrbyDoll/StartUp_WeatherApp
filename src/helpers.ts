export function getUrlGeo(data: string): string {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${data.split(" ")[0]},${data.split(" ")[1]}&appid=07a92f5fb756a201a6c5d7822a16965b`;
}

export function getUrlData(data: {lat:number, lon:number}): string {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&lang=ru&appid=07a92f5fb756a201a6c5d7822a16965b`;
}

export async function createFetch(url: string): Promise<any> {
  return fetch(url).then((file) => file.json())
}

// let prevState = citiesMass.slice();
//         const pushingInfo = {
//           sun: {
//             sunrise: sunriseDate.getHours() + " : " + sunriseDate.getMinutes(),
//             sunset: sunsetDate.getHours() + " : " + sunsetDate.getMinutes(),
//           },
//         };
//         prevState.push(pushingInfo);
//         setCitiesMass(prevState);