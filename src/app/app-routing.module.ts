import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { InteractiveMapComponent } from './interactive-map/interactive-map.component';
import { UnitManageComponent } from './unit-manage/unit-manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard, AuthGuardChild } from './auth/auth.guard';
import { OperationRecordComponent } from './operation-record/operation-record.component';
import { ErrorDeviceComponent } from './error-detection/error-device/error-device/error-device.component';
import { ErrorSystemComponent } from './error-detection/error-system/error-system/error-system.component';
import { NotfoundComponent } from './notfound/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-login', pathMatch: 'full' },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-home', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'app-dashboard', pathMatch: 'full' },
      { path: 'app-dashboard', component: DashboardComponent },
      { path: 'app-interactive-map', component: InteractiveMapComponent },
      { path: 'app-device-manage', component: DeviceManageComponent },
      { path: 'app-device-detail/:deviceMacAddress', component: DeviceDetailComponent },
      { path: 'app-unit-manage', component: UnitManageComponent },
      { path: 'app-user-manage', component: UserManageComponent },
      { path: 'app-error-device', component: ErrorDeviceComponent},
      { path: 'app-error-system', component: ErrorSystemComponent},
      { path: 'app-operation-record', component: OperationRecordComponent },
    ], canActivateChild: [AuthGuardChild],
  },
  { path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
