import { Component, ElementRef, ViewChild } from '@angular/core';
import { UnitManageService } from '../service/unit-manage/unit-manage.service';
import { ISearchDeviceByPlace, ISearchDeviceByPlaceList, ISearchDeviceByPlaceRequest } from '../models/unit-manage';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent {
  show = true;
  deviceData: ISearchDeviceByPlaceList[] = []
  deviceDataSource = new MatTableDataSource<ISearchDeviceByPlaceList>(this.deviceData);
  deviceDiaplayedColumns: string[] = ['Id', 'deviceName', 'operation'];
  placeName: string = '';
  constructor(
    private unitService: UnitManageService,
  ) { }

  // guid = this.id.nativeElement;
  // guid = document.getElementById('id');

  getPlaceName(unitGuid: string) {
    console.log(unitGuid);
    return this.unitService.searchDevicePlace(unitGuid).subscribe(res => {
      console.log(res);
    });

  }

  getDevice(placeGuid: string) {
    this.show = false;
    console.log(placeGuid);
    return this.unitService.searchDeviceByPlace(placeGuid).pipe(
      tap(res => {
        console.log(res);
        this.deviceData = res.data.searchDeviceByPlaceList;
        this.deviceData.forEach((element, index) => {
          return element.Id = index + 1;
        });
        this.placeName = res.data.searchDeviceByPlaceList[0].devicePlaceName;
        console.log(this.deviceData);
        this.deviceDataSource = new MatTableDataSource<ISearchDeviceByPlaceList>(this.deviceData);
      })
    ).subscribe();
  }
}
