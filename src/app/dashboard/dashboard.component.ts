import { Component, Type, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { DayLineChartComponent } from '../graph/day-line-chart/day-line-chart.component';
import { MonthCEmissionComponent } from '../graph/month-line-chart/month-cemission.component';
import { YearCEmissionComponent } from '../graph/year-line-chart/year-cemission.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DeviceManageService } from '../service/device-manage/device-manage.service';

export interface Tab {
  label: string;
  content: Type<DayLineChartComponent | MonthCEmissionComponent | YearCEmissionComponent>;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(DayLineChartComponent) dayCEmissionComponent!: DayLineChartComponent;
  @ViewChild(MonthCEmissionComponent) monthCEmissionComponent!: MonthCEmissionComponent;
  @ViewChild(YearCEmissionComponent) yearCEmissionComponent!: YearCEmissionComponent;
  asyncTabs: Observable<Tab[]>;
  activeTab: Type<DayLineChartComponent | MonthCEmissionComponent | YearCEmissionComponent> | null = null;
  private tabSubscription: Subscription | null = null;
  totalPage: number = 0;

  constructor(
    private deviceService: DeviceManageService,
  ) {
    this.asyncTabs = new Observable((observer: Observer<Tab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: '日結算', content: DayLineChartComponent },
          { label: '月結算', content: MonthCEmissionComponent },
          { label: '年結算', content: YearCEmissionComponent },
        ]);
      }, 500);
    });
  }

  ngOnInit(): void {
    this.tabSubscription = this.asyncTabs.subscribe(tabs => {
      this.activeTab = tabs[0].content;
    });
    this.getTotalDeviceCount();
  }
  // 選項卡切換
  onTabChange(event: MatTabChangeEvent) {
    if (this.tabSubscription) {
      this.tabSubscription.unsubscribe();
    }
    this.tabSubscription = this.asyncTabs.subscribe(tabs => {
      this.activeTab = tabs[event.index].content;
    });
  }
  getTotalDeviceCount(): void{
    this.deviceService.getTotalCount().subscribe((res) => {
      this.totalPage = res.data;    
    });
  }
  ngOnDestroy(): void {
    if (this.tabSubscription) {
      this.tabSubscription.unsubscribe();
    }
  }
}