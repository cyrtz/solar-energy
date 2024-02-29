import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms'
import { WeatherdataService } from '../service/weather/weatherdata.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
          if (this.weatheroverview === '晴') {
            this.weatheroverview = 'assets/img/weather/01.svg';
          } else if (this.weatheroverview === '晴有霾' || this.weatheroverview === '晴有靄' || this.weatheroverview === '晴有霧') {
            this.weatheroverview = 'assets/img/weather/24.svg';
          } else if (this.weatheroverview === '多雲') {
            this.weatheroverview = 'assets/img/weather/04.svg';
          } else if (this.weatheroverview === '陰') {
            this.weatheroverview = 'assets/img/weather/07.svg';
          } else if (this.weatheroverview === '陰有靄' || this.weatheroverview === '陰有霧' || this.weatheroverview === '陰有霾') {
            this.weatheroverview = 'assets/img/weather/28.svg';
          } else if (this.weatheroverview === '雨') {
            this.weatheroverview = 'assets/img/weather/11.svg';
          } else if (this.weatheroverview === '陰有雨') {
            this.weatheroverview = 'assets/img/weather/14.svg';
          }
          else {
            this.weatheroverview = this.weatheroverview;
          }
          
        } else {
          console.log('Error: ' + res.message);
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
