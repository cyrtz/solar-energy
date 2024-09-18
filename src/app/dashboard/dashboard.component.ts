import { Component, Type, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DeviceManageService } from '../service/device-manage/device-manage.service';
import { LineDayComponent } from '../charts/line-day/line-day.component';
import { LineMonthComponent } from '../charts/line-month/line-month.component';
import { LineWeekComponent } from '../charts/line-week/line-week.component';
import { StackedColumnsDayComponent } from '../charts/stacked-columns-day/stacked-columns-day.component';
import { StackedColumnsMonthComponent } from '../charts/stacked-columns-month/stacked-columns-month.component';
import { StackedColumnsWeekComponent } from '../charts/stacked-columns-week/stacked-columns-week.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../service/account/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Tab {
  label: string;
  content: Type<LineDayComponent | LineMonthComponent | LineWeekComponent>;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(LineDayComponent) lineDayComponent!: LineDayComponent;
  @ViewChild(LineMonthComponent) lineMonthComponent!: LineMonthComponent;
  @ViewChild(LineWeekComponent) lineYearComponent!: LineWeekComponent;
  @ViewChild(StackedColumnsDayComponent) stackedColumnsDayComponent!: StackedColumnsDayComponent;
  @ViewChild(StackedColumnsMonthComponent) stackedColumnsMonthComponent!: StackedColumnsMonthComponent;
  @ViewChild(StackedColumnsWeekComponent) stackedColumnsYearComponent!: StackedColumnsWeekComponent;

  asyncPGTabs: Observable<Tab[]>;
  asyncCRTabs: Observable<Tab[]>;
  activePGTab: Type<LineDayComponent | LineMonthComponent | LineWeekComponent> | null = null;
  activeCRTab: Type<StackedColumnsDayComponent | StackedColumnsMonthComponent | StackedColumnsWeekComponent> | null = null;
  private tabPGSubscription: Subscription | null = null;
  private tabCRSubscription: Subscription | null = null;
  totalPage: number = 0;
  errorDevice: number = 0;
  totalPower: number = 0;
  totalCarbon: number = 0;
  authorizeCode: string = '';

  constructor(
    private deviceService: DeviceManageService,
    private accountService: AccountService,
    private router: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.asyncPGTabs = new Observable((observer: Observer<Tab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: '日結算', content: LineDayComponent },
          { label: '週結算', content: LineWeekComponent },
          { label: '月結算', content: LineMonthComponent },
        ]);
      }, 500);
    });
    this.asyncCRTabs = new Observable((observer: Observer<Tab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: '日結算', content: StackedColumnsDayComponent },
          { label: '週結算', content: StackedColumnsWeekComponent },
          { label: '月結算', content: StackedColumnsMonthComponent },
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
    this.router.queryParams.subscribe(params => {
      this.authorizeCode = params['code'];

      if (this.authorizeCode) {
        this.giveAccessToken(this.authorizeCode);
      }
    });
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

  giveAccessToken(authorizeCode: string): void {
    if (authorizeCode) {
      this.snackBar.open('LINE NOTIFY連接成功', '關閉', {
        duration: 5000,
      })
      this.accountService.getAccessToken(authorizeCode).subscribe((res) => {
        console.log(res);
      });
    }
  }
}