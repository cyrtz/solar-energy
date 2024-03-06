import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from "ng-apexcharts";
import { dataSeries } from '../models/data-series';
import { deviceListRes } from '../models/device-manage';


// import { IDataRecord } from './data-series';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
  fill: ApexFill;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})

export class DeviceDetailComponent {

  deviceName: string = '';
  batteryPower: number = 0;
  battVoltage: number = 0;
  battAmpere: number = 0;
  loadVoltage: number = 0;
  loadAmpere: number = 0;
  co2Reduce: string = '';


  constructor(public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      // 取得路由參數，這裡是取得 guid
      console.log(params);
    });
  }  
}
