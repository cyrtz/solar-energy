import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewUnitDialogComponent } from '../dialog/new-unit-dialog/new-unit-dialog.component';
import { DeleteUnitDialogComponent } from '../dialog/delete-unit-dialog/delete-unit-dialog.component';

@Component({
  selector: 'app-unit-manage',
  templateUrl: './unit-manage.component.html',
  styleUrls: ['./unit-manage.component.scss']
})
export class UnitManageComponent implements AfterViewInit{
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
    const dialogRef = this.dialog.open(NewUnitDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
    });
  }
  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeleteUnitDialogComponent, {
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

