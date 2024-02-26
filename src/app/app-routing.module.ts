import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { UserManagerComponent } from './user-manager/user-manager.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'app-home',
    component: HomeComponent,
    children: [
      {path: 'app-device-manage', component: DeviceManageComponent},
      {path: 'app-device-detail', component: DeviceDetailComponent},
      {path: 'app-user-manager', component: UserManagerComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
