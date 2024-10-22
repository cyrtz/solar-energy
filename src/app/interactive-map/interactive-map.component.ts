import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnitManageService } from '../service/unit-manage/unit-manage.service';
import { ISearchDeviceByPlaceList, IUnitListResponse } from '../models/unit-manage';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewDeviceByUnitDialogComponent } from '../dialog/new-device-by-unit-dialog/new-device-by-unit-dialog.component';
import { DeleteDeviceDialogComponent } from '../dialog/delete-device-dialog/delete-device-dialog.component';
import { deviceListRes } from '../models/device-manage';
import { EditDeviceDialogComponent } from '../dialog/edit-device-dialog/edit-device-dialog.component';
import { Token } from '@angular/compiler';

export interface DialogData {
  unitGuid: string;
}
@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent implements OnInit {
  show = true;
  deviceData: ISearchDeviceByPlaceList[] = []
  deviceDataSource = new MatTableDataSource<ISearchDeviceByPlaceList>(this.deviceData);
  deviceDiaplayedColumns: string[] = ['Id', 'deviceName', 'devicePlace', 'operation'];
  unitName: string = '';
  getUnitGuid: string = '';
  token = localStorage.getItem('token') as string;
  tokenPayload = JSON.parse(window.atob(this.token.split('.')[1]));
  userRole = this.tokenPayload.customRole;
  unitList: IUnitListResponse[] = [];
  placeMapObj = {
    zhongShang: {
      id: 'd9d91185-2853-4a90-98e3-db6ca860cab3',
      hasDevice: true
    },
    studentActivity:{
      id: 'a19dd49c-fac0-4fc6-b2b0-c4a520a2e1e1',
      hasDevice: false
    },
    hanYing: {
      id: '282f1cb7-a4bc-44c2-9349-5379be294cfe',
      hasDevice: false
    },
    playground: {
      id: 'a50c71e1-45f5-4da0-980c-d389909bc837',
      hasDevice: false
    },
    zhongZheng: {
      id: '9e9f26bd-31cc-4e04-8424-5c61037e003c',
      hasDevice: false
    },
    information: {
      id: 'c14cc2ef-464e-49d7-807f-33a7338b69c3',
      hasDevice: false
    },
    administration: {
      id: '6c8c52f5-555d-4d59-a1f1-e2e2176e0318',
      hasDevice: false
    },
    hongYe: {
      id: '41aa4bf7-5e9f-4efd-9c6f-53f5558c2a8f',
      hasDevice: false
    },
    stadium: {
      id: '8ae57ef6-562f-4566-8e49-fbd82adb82e8',
      hasDevice: false
    },
    qiXiu: {
      id:'802d8a9d-19cc-4730-baf3-a87794c13305',
      hasDevice: false
    },
    chungMing: {
      id: '4ea79ae3-abc9-4155-abcc-350bc4e0bd58',
      hasDevice: false
    },
    femaleDormitory: {
      id: 'dfd63a32-68d5-4ac8-9a03-a01c043d52ae',
      hasDevice: false
    },
    zhongJi: {
      id: '0b95d6d0-20f3-4738-ae08-b8e8a0bd8762',
      hasDevice: true
    },
    maleDormitory: {
      id: 'c5de2688-678e-44ea-8bfd-b47e534bdec0',
      hasDevice: false
    },
  };
  
  constructor(
    private unitService: UnitManageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUnitList().subscribe();    
  }
  getUnitList(): Observable<any> {
    return this.unitService.getTotalUnits().pipe(
      tap(res => {
        if (res.data.unitList) {
          this.unitList = res.data.unitList;
        }
      })
    )
  }
  getDevice(unitGuid: string) {
    this.show = false;
    this.getUnitGuid = unitGuid;
    this.unitList.forEach(element => {
      if (element.deviceUnitGuid === unitGuid) {
        this.unitName = element.deviceUnitName;
      }
    });
    return this.unitService.searchDeviceByUnit(unitGuid).pipe(
      tap(res => {
        this.deviceData = res.data.deviceDataList.reverse();
        this.deviceData.forEach((element, index) => {
          return element.Id = index + 1;
        });
        this.deviceDataSource = new MatTableDataSource<ISearchDeviceByPlaceList>(this.deviceData);
      })
    ).subscribe();
  }
  //新增設備Dialog
  newDeviceByUnitDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewDeviceByUnitDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
      data: { unitGuid: this.getUnitGuid }
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      this.getDevice(this.getUnitGuid);
    });
  }
  // 刪除設備Dialog
  deleteDeviceDialog(enterAnimationDuration: string, exitAnimationDuration: string, device: deviceListRes): void {
    const dialogRef = this.dialog.open(DeleteDeviceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
      data: device
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      this.getDevice(this.getUnitGuid);
    });
  }
  // 編輯設備Dialog
  editDeviceDialog(enterAnimationDuration: string, exitAnimationDuration: string, device: deviceListRes): void {
    const dialogRef = this.dialog.open(EditDeviceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
      data: device
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      this.getDevice(this.getUnitGuid);
    });
  }
}
