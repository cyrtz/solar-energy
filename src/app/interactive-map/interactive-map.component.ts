import { Component, ElementRef, ViewChild } from '@angular/core';
import { UnitManageService } from '../service/unit-manage/unit-manage.service';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent {
  show = true;
  @ViewChild('id')
  id!: ElementRef;
  constructor(
    private unitService: UnitManageService,
  ) { }

  // guid = this.id.nativeElement;
  // guid = document.getElementById('id');

  getDevice(placeGuid: string){
    this.show = false;
    console.log(placeGuid);
    return this.unitService.searchDeviceByPlace(placeGuid).subscribe(res => {
      console.log(res);
    });
  }
}
