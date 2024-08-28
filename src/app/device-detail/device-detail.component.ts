import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetailService } from '../service/device-detail/device-detail.service';
import { Location } from '@angular/common';
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
  date = new FormControl(new Date());
  types: Type[] = [
    { value: 'electricity', viewValue: '發電量' },
    { value: 'carbon', viewValue: '節碳量' },
  ]
  selectedType: string = this.types[0].value;
  constructor(
    public route: ActivatedRoute,
    private devicedetailService: DeviceDetailService,
    private location: Location,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }
  
  @ViewChild(BatteryDataComponent) batteryDataComponent!: BatteryDataComponent;
  ngOnInit(): void {
    // this.getDeviceDetail();
    // 取得路由參數，這裡是取得 MacAddress
    this.route.params.subscribe(params => {
      this.deviceMacAddress = params['deviceMacAddress'];
    });
    this.getDeviceData();
  }
  getDeviceData() {
    this.devicedetailService.getDeviceData(this.deviceMacAddress).subscribe(res => {
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
      this.openSnackBar(res.message, '關閉');
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
