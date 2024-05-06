import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnitManageService } from '../service/unit-manage/unit-manage.service';
import { IPlaceListResponse, ISearchDeviceByPlace, ISearchDeviceByPlaceList, ISearchDeviceByPlaceRequest, IUnitListResponse } from '../models/unit-manage';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent implements OnInit{
  show = true;
  deviceData: ISearchDeviceByPlaceList[] = []
  deviceDataSource = new MatTableDataSource<ISearchDeviceByPlaceList>(this.deviceData);
  deviceDiaplayedColumns: string[] = ['Id', 'deviceName', 'operation'];
  unitName: string = '';
  unitList: IUnitListResponse[] = [];
  constructor(
    private unitService: UnitManageService,
  ) { }

  ngOnInit(): void {
    this.getUnitList().subscribe();
  }
  // guid = this.id.nativeElement;
  // guid = document.getElementById('id');

  getUnitList() {
    return this.unitService.getTotalUnits().pipe(
      tap(res => {
        console.log(res);
        if (res.data.unitList) {
          this.unitList = res.data.unitList;
        }
      })
    )
  }

  // getPlaceName(placeGuid: string) {
  //   console.log();
  //   return this.unitService.getPlaces().subscribe(res => {
  //     console.log(res);
  //     if (res.data.placeList) {
  //       res.data.placeList.forEach(element => {
  //         if (element.devicePlaceGuid === placeGuid) {
  //           this.placeName = element.devicePlaceName;
  //         }
  //       });
  //     }
  //   });

  // }

  getDevice(unitGuid: string) {
    this.show = false;
    console.log(unitGuid);
    this.unitList.forEach(element => {
      if (element.deviceUnitGuid === unitGuid) {
        this.unitName = element.deviceUnitName;
      }
    })
    return this.unitService.searchDeviceByUnit(unitGuid).pipe(
      tap(res => {
        console.log(res);
        this.deviceData = res.data.deviceDataList;
        this.deviceData.forEach((element, index) => {
          return element.Id = index + 1;
        });
        // this.placeName = res.data.searchDeviceByPlaceList[0].devicePlaceName;
        console.log(this.deviceData);
        this.deviceDataSource = new MatTableDataSource<ISearchDeviceByPlaceList>(this.deviceData);
      })
    ).subscribe();
  }
}
