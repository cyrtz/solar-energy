import { Component, Type, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DeviceManageService } from '../service/device-manage/device-manage.service';
import { LineDayComponent } from '../charts/line-day/line-day.component';
import { LineMonthComponent } from '../charts/line-month/line-month.component';
import { LineYearComponent } from '../charts/line-year/line-year.component';
import { StackedColumnsDayComponent } from '../charts/stacked-columns-day/stacked-columns-day.component';
import { StackedColumnsMonthComponent } from '../charts/stacked-columns-month/stacked-columns-month.component';
import { StackedColumnsYearComponent } from '../charts/stacked-columns-year/stacked-columns-year.component';

export interface Tab {
  label: string;
  content: Type<LineDayComponent | LineMonthComponent | LineYearComponent>;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(LineDayComponent) lineDayComponent!: LineDayComponent;
  @ViewChild(LineMonthComponent) lineMonthComponent!: LineMonthComponent;
  @ViewChild(LineYearComponent) lineYearComponent!: LineYearComponent;
  @ViewChild(StackedColumnsDayComponent) stackedColumnsDayComponent!: StackedColumnsDayComponent;
  @ViewChild(StackedColumnsMonthComponent) stackedColumnsMonthComponent!: StackedColumnsMonthComponent;
  @ViewChild(StackedColumnsYearComponent) stackedColumnsYearComponent!: StackedColumnsYearComponent;

  asyncPGTabs: Observable<Tab[]>;
  asyncCRTabs: Observable<Tab[]>;
  activePGTab: Type<LineDayComponent | LineMonthComponent | LineYearComponent> | null = null;
  activeCRTab: Type<StackedColumnsDayComponent | StackedColumnsMonthComponent | StackedColumnsYearComponent> | null = null;
  private tabPGSubscription: Subscription | null = null;
  private tabCRSubscription: Subscription | null = null;
  totalPage: number = 0;

  constructor(
    private deviceService: DeviceManageService,
  ) {
    this.asyncPGTabs = new Observable((observer: Observer<Tab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: '日結算', content: LineDayComponent },
          { label: '月結算', content: LineMonthComponent },
          { label: '年結算', content: LineYearComponent },
        ]);
      }, 500);
    });
    this.asyncCRTabs = new Observable((observer: Observer<Tab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: '日結算', content: StackedColumnsDayComponent},
          { label: '月結算', content: StackedColumnsMonthComponent },
          { label: '年結算', content: StackedColumnsYearComponent },
        ]);
      }, 500);
    });
  }

  ngOnInit(): void {
    this.tabPGSubscription = this.asyncPGTabs.subscribe(tabs => {
      this.activePGTab = tabs[0].content;
    });
    this.tabCRSubscription = this.asyncCRTabs.subscribe(tabs => {
      this.activeCRTab = tabs[0].content;
    });
    this.getTotalDeviceCount();
  }
  // 節碳選項卡切換
  onCRTabChange(event: MatTabChangeEvent) {
    if (this.tabCRSubscription) {
      this.tabCRSubscription.unsubscribe();
    }
    this.tabCRSubscription = this.asyncCRTabs.subscribe(tabs => {
      this.activeCRTab = tabs[event.index].content;
    });
  }
  // 發電選項卡切換
  onPGTabChange(event: MatTabChangeEvent) {
    if (this.tabPGSubscription) {
      this.tabPGSubscription.unsubscribe();
    }
    this.tabPGSubscription = this.asyncPGTabs.subscribe(tabs => {
      this.activePGTab = tabs[event.index].content;
    });
  }
  // 取得裝置總數
  getTotalDeviceCount(): void {
    this.deviceService.getTotalCount().subscribe((res) => {
      this.totalPage = res.data;
    });
  }
  // 銷毀訂閱
  ngOnDestroy(): void {
    if (this.tabPGSubscription) {
      this.tabPGSubscription.unsubscribe();
    }
    if (this.tabCRSubscription) {
      this.tabCRSubscription.unsubscribe();
    }
  }
}