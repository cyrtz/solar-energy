import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DialogComponent } from './dialog/login-dialog/dialog.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';
import { NewDeviceDialogComponent } from './dialog/new-device-dialog/new-device-dialog.component';
import { DeleteDeviceDialogComponent } from './dialog/delete-device-dialog/delete-device-dialog.component';
import { EditDeviceDialogComponent } from './dialog/edit-device-dialog/edit-device-dialog.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { RegisterDialogComponent } from './dialog/register-dialog/register-dialog/register-dialog.component';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_DATE_LOCALE, MatCommonModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { InteractiveMapComponent } from './interactive-map/interactive-map.component';
import { UnitManageComponent } from './unit-manage/unit-manage.component';
import { NewUnitDialogComponent } from './dialog/new-unit-dialog/new-unit-dialog.component';
import { DeleteUnitDialogComponent } from './dialog/delete-unit-dialog/delete-unit-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorDetectComponent } from './error-detect/error-detect.component';
import { NewPlaceDialogComponent } from './dialog/new-place-dialog/new-place-dialog.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StackedColumnsDayComponent } from './charts/stacked-columns-day/stacked-columns-day.component';
import { StackedColumnsMonthComponent } from './charts/stacked-columns-month/stacked-columns-month.component';
import { StackedColumnsWeekComponent } from './charts/stacked-columns-week/stacked-columns-week.component';
import { LineDayComponent } from './charts/line-day/line-day.component';
import { LineMonthComponent } from './charts/line-month/line-month.component';
import { LineWeekComponent } from './charts/line-week/line-week.component';
import { DeletePlaceDialogComponent } from './dialog/delete-place-dialog/delete-place-dialog.component';
import { InterceptorService } from './service/interceptor/interceptor.service';
import { NewDeviceByUnitDialogComponent } from './dialog/new-device-by-unit-dialog/new-device-by-unit-dialog.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { EditAccountDialogComponent } from './dialog/edit-account-dialog/edit-account-dialog.component';
import { NewUserDialogComponent } from './dialog/new-user-dialog/new-user-dialog/new-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DialogComponent,
    DeviceDetailComponent,
    DeviceManageComponent,
    NewDeviceDialogComponent,
    DeleteDeviceDialogComponent,
    EditDeviceDialogComponent,
    RegisterDialogComponent,
    UserManageComponent,
    InteractiveMapComponent,
    UnitManageComponent,
    NewUnitDialogComponent,
    DeleteUnitDialogComponent,
    DashboardComponent,
    ErrorDetectComponent,
    NewPlaceDialogComponent,
    StackedColumnsMonthComponent,
    StackedColumnsDayComponent,
    LineDayComponent,
    LineWeekComponent,
    LineMonthComponent,
    DeletePlaceDialogComponent,
    StackedColumnsWeekComponent,
    NewDeviceByUnitDialogComponent,
    UserInfoComponent,
    EditAccountDialogComponent,
    NewUserDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressBarModule,
    MatDividerModule,
    MatTableModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatCommonModule,
    MatNativeDateModule,
    MatListModule,
    MatSelectModule,
  ],
  providers: [
    { 
      provide: MAT_DATE_LOCALE, useValue: 'zh-TW' 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
