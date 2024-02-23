import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms'
import { WeatherdataService } from '../service/weather/weatherdata.service';
import { timer } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  temperature = 0;
  weatheroverview = '';

  constructor(
    private WeatherdataService: WeatherdataService
  ) { }

  ngOnInit(): void {
    this.getWeatherData();
    this.getWeatherDataInterval();
  }

  getWeatherData() {
    this.WeatherdataService.weatherData().subscribe(
      res => {
        if (res.isSuccess) {
          this.temperature = res.data.airTemperature;
          this.weatheroverview = res.data.weather;
        }
      }
    )
  }
  getWeatherDataInterval() {
    const source = interval(300000);
    source.subscribe(() => {
      this.getWeatherData();
    });
  }
}
