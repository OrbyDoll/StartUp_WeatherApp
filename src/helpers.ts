export function getUrlGeo(data: string): string {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${data.split(" ")[0]},${data.split(" ")[1]}&appid=07a92f5fb756a201a6c5d7822a16965b`;
}

export function getUrlData(data: {lat:number, lon:number}): string {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&lang=en&appid=07a92f5fb756a201a6c5d7822a16965b`;
}

export async function createFetch(url: string): Promise<any> {
  return fetch(url).then((file) => file.json())
}

export function getUrlForecast(data: {lat:number, lon:number}):string{
  return `http://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&cnt=40&appid=07a92f5fb756a201a6c5d7822a16965b`
}

export function getImgUrl(info:string):string{
  return `https://openweathermap.org/img/wn/${info}@2x.png`
}