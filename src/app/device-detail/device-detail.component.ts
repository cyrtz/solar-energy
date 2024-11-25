import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetailService } from '../service/device-detail/device-detail.service';
import { formatDate, Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IControlBattReq, IControlLoadReq } from '../models/device-detail';
import { BatteryDataComponent } from '../charts/battery-data/battery-data.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})

export class DeviceDetailComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
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
  date = new Date();
  getTodayDate = formatDate(this.date, 'yyyy-MM-dd', 'en-US', '+0800');
  predictionPower: number = 0;
  predictionCo2Reduce: number = 0;
  constructor(
    public route: ActivatedRoute,
    private devicedetailService: DeviceDetailService,
    private location: Location,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // this.getDeviceDetail();
    // 取得路由參數，這裡是取得 MacAddress
    this.route.params.subscribe(params => {
      this.deviceMacAddress = params['deviceMacAddress'];
    });
    this.getDeviceInfo();
    this.getSunDetailData();
    this.getDateTotalGen();
    this.getPredictionPower(10);
  }
  getDeviceInfo() {
    this.devicedetailService.getDeviceData(this.deviceMacAddress).subscribe(res => {
      this.deviceName = res.data.deviceName;
      this.deviceUnitName = res.data.deviceUnitName;
      this.devicePlaceName = res.data.devicePlaceName;
    });
  }

  getSunDetailData() {
    this.devicedetailService.getSunDetailData(this.deviceMacAddress, "2024-09-03").subscribe(res => {
      // console.log(res);
      if (res.data.length > 0) {
        this.battVoltage = res.data[0].dataV;
        this.battAmpere = res.data[0].dataA;
        this.battWatt = res.data[0].dataW;
        this.battState = res.data[0].battState;
      }
    });
  }

  getDateTotalGen() {
    this.devicedetailService.getDateTotalGen(this.deviceMacAddress, "2024-10-10").subscribe(res => {
      this.battPower = res.data.totalGeneration;
      this.co2Reduce = res.data.carbonEmissions;
    });
  }

  getPredictionPower(solarRadiation: number) {
    this.devicedetailService.getPredictionPower(solarRadiation).subscribe(res => {
      this.predictionPower = res.data;
      this.predictionCo2Reduce = res.data * 0.495;
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
      this.openSnackBar(res.message, '關閉');
      this.getSunDetailData();
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
      this.openSnackBar(res.message, '關閉');
      this.getSunDetailData();
    });
  }
  goBack() {
    this.location.back();
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}

interface Type {
  value: string;
  viewValue: string;
}
