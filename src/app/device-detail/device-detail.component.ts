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
  // getDeviceGuid: string = '';
  @Input() deviceGuid: string = '';
  // deviceGuid: string = '';
  deviceName: string = '';
  deviceUnitName: string = '';
  devicePlaceName: string = '';
  battPower: number = 0;
  battVoltage: number = 0;
  battAmpere: number = 0;
  loadVoltage: number = 0;
  loadAmpere: number = 0;
  co2Reduce: string = '';

  ngOnInit(): void {
    // this.getDeviceDetail();
    this.route.params.subscribe(params => {
      // 取得路由參數，這裡是取得 guid
      this.deviceGuid = params['deviceGuid'];
      console.log(this.deviceGuid);
    });
    this.getDeviceDetail();
    this.getDeviceData();
  }

  constructor(
    public route: ActivatedRoute,
    private devicedetailService: DeviceDetailService,
  ) {

  }
  getDeviceDetail() {
    this.devicedetailService.getDeviceDetail(this.deviceGuid).subscribe(res => {
      console.log(res);
    });
  }

  getDeviceData() {
    // console.log();
    this.devicedetailService.getDeviceData(this.deviceGuid).subscribe(res => {
      console.log(res);
      this.deviceName = res.data.deviceName;
      this.deviceUnitName = res.data.deviceUnitName;
      this.devicePlaceName = res.data.devicePlaceName;
      this.battPower = res.data.battPower;
      this.battVoltage = res.data.battVoltage;
      this.battAmpere = res.data.battAmpere;
      this.loadVoltage = res.data.loadVoltage;
      this.loadAmpere = res.data.loadAmpere;
      this.co2Reduce = res.data.co2Reduce;
    });
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
