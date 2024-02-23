export interface IWeatherApiResponse<T> {
    data: T
    isSuccess: boolean
    message: string
  }
  
  export interface IWeatherData {
    weather: string
    airTemperature: number
  }