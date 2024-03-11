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
import { DeviceDetailService } from '../service/device-detail/device-detail.service';


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

export class DeviceDetailComponent implements OnInit {

  @Input() deviceGuid: string = '';
  // deviceName: string = '';
  // batteryPower: number = 0;
  // battVoltage: number = 0;
  // battAmpere: number = 0;
  // loadVoltage: number = 0;
  // loadAmpere: number = 0;
  // co2Reduce: string = '';

  ngOnInit(): void {
    // this.getDeviceDetail();
    this.route.params.subscribe(params => {
      // 取得路由參數，這裡是取得 guid
      this.deviceGuid = params['guid'];
      console.log(params);
    });
  }

  constructor(
    public route: ActivatedRoute,
    private devicedetailService: DeviceDetailService,
  ) {

  }

  deviceDetail = {
    deviceGuid: this.deviceGuid,
    deviceName: '阿爾卑斯山一號',
    batteryPower: 30,
    battVoltage: 10,
    battAmpere: 20,
    loadVoltage: 0,
    loadAmpere: 0,
    deviceUnitName: '中科大',
    devicePlaceName: '頂樓',
    createTime: '2021-08-01',
    updateTime: '2021-08-01',
  };
}
