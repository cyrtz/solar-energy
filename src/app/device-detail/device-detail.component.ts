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
import { Location } from '@angular/common';
import { IControlBattReq, IControlLoadReq } from '../models/device-detail';


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

  deviceName: string = '';
  deviceUnitName: string = '';
  devicePlaceName: string = '';
  @Input() deviceMacAddress: string = '';
  battPower: number = 0;
  battVoltage: number = 0;
  battAmpere: number = 0;
  battWatt: number = 0;
  battState: number = 0;
  loadVoltage: number = 0;
  loadAmpere: number = 0;
  co2Reduce: number = 0;
  loadBatt: number = 0;
  loadMain: number = 0;

  ngOnInit(): void {
    // this.getDeviceDetail();
    // 取得路由參數，這裡是取得 MacAddress
    this.route.params.subscribe(params => {
      this.deviceMacAddress = params['deviceMacAddress'];
    });
    // this.getDeviceDetail();
    this.getDeviceData();
  }

  constructor(
    public route: ActivatedRoute,
    private devicedetailService: DeviceDetailService,
    private location: Location
  ) { }
  // 沒有該API
  // getDeviceDetail() {
  //   this.devicedetailService.getDeviceDetail(this.deviceGuid).subscribe(res => {
  //     console.log(res);
  //   });
  // }

  getDeviceData() {
    this.devicedetailService.getDeviceData(this.deviceMacAddress).subscribe(res => {
      // console.log(res);
      this.deviceName = res.data.deviceName;
      this.deviceUnitName = res.data.deviceUnitName;
      this.devicePlaceName = res.data.devicePlaceName;
      this.battPower = res.data.battPower;
      this.battVoltage = res.data.battVoltage;
      this.battAmpere = res.data.battAmpere;
      this.battWatt = res.data.battWatt;
      this.battState = res.data.battState;
      this.loadVoltage = res.data.loadVoltage;
      this.loadAmpere = res.data.loadAmpere;
      this.co2Reduce = res.data.co2Reduce;
    });
  }

  battChange(checked: boolean) {
    if (checked === true) {
      this.battState = 1;
    } else {
      this.battState = 0;
    }
    const params: IControlBattReq  = {
      macAddress: this.deviceMacAddress,
      battState: this.battState.toString(),
      mqttIp: '',
      mqttPort: 0,
      mqttTopic: ''
    }
    this.devicedetailService.controlBatt(params).subscribe(res => {
      alert(res.message);
    });
  }
  loadChange(checked: boolean) {
    if (checked === true) {
      this.loadBatt = 1;
      this.loadMain = 0;
    } else {
      this.loadBatt = 0;
      this.loadMain = 1;
    }
    const params:IControlLoadReq = {
      macAddress: this.deviceMacAddress,
      loadState1: this.loadBatt.toString(),
      loadState2: this.loadMain.toString(),
      mqttIp: '',
      mqttPort: 0,
      mqttTopic: ''
    }
    this.devicedetailService.controlLoad(params).subscribe(res => {
      alert(res.message);
    });
  }

  goBack() {
    this.location.back();
  }

  deviceDetail = {
    deviceName: '阿爾卑斯山一號',
    deviceUnitName: '中科大',
    devicePlaceName: '頂樓',
    batteryPower: 30,
    battVoltage: 10,
    battAmpere: 20,
    battWatt: 0,
    loadVoltage: 0,
    loadAmpere: 0,
    co2Reduce: 0
  };
}
