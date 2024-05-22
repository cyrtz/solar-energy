import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnitManageService } from '../service/unit-manage/unit-manage.service';
import { IPlaceListItem, ISearchDeviceByPlace, ISearchDeviceByPlaceList, ISearchDeviceByPlaceRequest, IUnitListResponse } from '../models/unit-manage';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { NewDeviceDialogComponent } from '../dialog/new-device-dialog/new-device-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeviceManageService } from '../service/device-manage/device-manage.service';
import { NewDeviceByUnitDialogComponent } from '../dialog/new-device-by-unit-dialog/new-device-by-unit-dialog.component';

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
  deviceDiaplayedColumns: string[] = ['Id', 'deviceName', 'operation'];
  unitName: string = '';
  getUnitGuid: string = '';
  unitList: IUnitListResponse[] = [];
  test: {[key: string]: boolean} = {
    'd9d91185-2853-4a90-98e3-db6ca860cab3': true,
    'a19dd49c-fac0-4fc6-b2b0-c4a520a2e1e1': false,
  };
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
    private deviceService: DeviceManageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUnitList().subscribe();
    this.showIcon();
  }

  getUnitList(): Observable<any> {
    return this.unitService.getTotalUnits().pipe(
      tap(res => {
        console.log(res);
        if (res.data.unitList) {
          this.unitList = res.data.unitList;
        }
      })
    )
  }

  showIcon(): void {
    this.deviceService.getDevices(0, 6).subscribe(res => {
      console.log(res);
      res.data.deviceList.map(element => {
        // if (element.deviceUnitName) {
        //   this.test.push({ guid: element.deviceUnitName, show: true });
        // } else {
        //   this.test.push({ guid: element.deviceUnitName, show: false });
        // }
        // this.test.push({ guid: element.deviceUnitName, show: true });
      });
      console.log(this.test);
    });
  }

  getDevice(unitGuid: string) {
    this.show = false;
    console.log(unitGuid);
    this.getUnitGuid = unitGuid;
    this.unitList.forEach(element => {
      if (element.deviceUnitGuid === unitGuid) {
        this.unitName = element.deviceUnitName;
      }
    });
    return this.unitService.searchDeviceByUnit(unitGuid).pipe(
      tap(res => {
        console.log(res);
        this.deviceData = res.data.deviceDataList;
        this.deviceData.forEach((element, index) => {
          return element.Id = index + 1;
        });
        // this.test.find(element => element.guid === unitGuid)?.show;
        console.log(this.test);
        // this.placeName = res.data.searchDeviceByPlaceList[0].devicePlaceName;
        console.log(this.deviceData);
        this.deviceDataSource = new MatTableDataSource<ISearchDeviceByPlaceList>(this.deviceData);
      })
    ).subscribe();
  }
  //新增設備
  newDeviceDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewDeviceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      console.log('dialogClosed');
      this.getDevice(this.getUnitGuid);
    });
  }
  newDeviceByUnitDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewDeviceByUnitDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
      data: { unitGuid: this.getUnitGuid }
    });
    // 訂閱 dialogClosed 事件
    // dialogRef.componentInstance.dialogClosed.subscribe(() => {
    //   // 事件觸發時重新取得設備列表
    //   console.log('dialogClosed');
    //   this.getDevice(this.getUnitGuid);
    // });
  }
}
