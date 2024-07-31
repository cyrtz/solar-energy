import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetailService } from '../service/device-detail/device-detail.service';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeviceHistoryDialogComponent } from '../dialog/device-history-dialog/device-history-dialog.component';
import { IControlBattReq, IControlLoadReq } from '../models/device-detail';
import { BatteryDataComponent } from '../charts/battery-data/battery-data.component';


// import { IDataRecord } from './data-series';


@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})

export class DeviceDetailComponent implements OnInit {
  @ViewChild(BatteryDataComponent) batteryDataComponent!: BatteryDataComponent;

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

  ngOnInit(): void {
    // this.getDeviceDetail();
    // 取得路由參數，這裡是取得 MacAddress
    this.route.params.subscribe(params => {
      this.deviceMacAddress = params['deviceMacAddress'];
    });
    // this.getDeviceDetail();
    this.getDeviceData();
  }

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
  ) {

  }
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

  search(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeviceHistoryDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        deviceMacAddress: this.deviceMacAddress,
        selectedType: this.selectedType,
        date: this.date.value
      }
    });
  }
}

interface Type {
  value: string;
  viewValue: string;
}
