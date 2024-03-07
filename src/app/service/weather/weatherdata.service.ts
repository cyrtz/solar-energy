import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeatherApiResponse, IWeatherData } from 'src/app/models/weather-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherdataService {

  private baseUrl = 'http://192.168.50.132:5141' // URL to web api

  constructor(
    private http: HttpClient
  ) { }
  
  weatherData(): Observable<IWeatherApiResponse<IWeatherData>> {
    const url = this.baseUrl + '/weather/Weather/GetShowWeatherData';
    return this.http.get<IWeatherApiResponse<IWeatherData>>(url);
  }
}
