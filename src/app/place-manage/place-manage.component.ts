import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPlaceDialogComponent } from '../dialog/new-place-dialog/new-place-dialog/new-place-dialog.component';
import { DeletePlaceDialogComponent } from '../dialog/delete-place-dialog/delete-place-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-place-manage',
  templateUrl: './place-manage.component.html',
  styleUrls: ['./place-manage.component.scss']
})

export class PlaceManageComponent implements AfterViewInit{
  displayedColumns: string[] = ['position', 'unitName', 'operation'];
  dataSource = new MatTableDataSource<UnitData>(UNIT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public dialog: MatDialog,
  ) { }

  test(){
    console.log(this.dataSource)
  }
  newDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewPlaceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
    });
  }
  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeletePlaceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
    });
    // 訂閱 dialogClosed 事件
    // dialogRef.componentInstance.dialogClosed.subscribe(() => {
    //   // 事件觸發時重新取得設備列表
    //   console.log('dialogClosed');
    //   this.getDevices(this.currentPage, 6);
    //   this.getTotalPage();
    // });
  }
}

export interface PeriodicElement {
  unitname: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, unitname: 'Hydrogen'},
  {position: 2, unitname: 'Helium'},
  {position: 3, unitname: 'Lithium'},
  {position: 4, unitname: 'Beryllium'},
  {position: 5, unitname: 'Boron'},
  
];

export interface UnitData {
  unitName: string;
  position: number;
}

const UNIT_DATA: UnitData[] = [
  {position: 1, unitName: '中科大'},
  {position: 2, unitName: '中興大'},
  {position: 3, unitName: '中正大'},
  {position: 4, unitName: '中山大'},
  {position: 5, unitName: '台科大'},
];