import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeatherApiResponse, IWeatherData } from 'src/app/models/weather-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherdataService {

  private  baseUrl = 'http://192.168.50.248:5142';

  constructor(
    private http: HttpClient
  ) { }
  
  weatherData(): Observable<IWeatherApiResponse<IWeatherData>> {
    const ApiUrl = this.baseUrl + '/weather/Weather/GetShowWeatherData';
    return this.http.get<IWeatherApiResponse<IWeatherData>>(ApiUrl);
  }
}
