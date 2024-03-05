import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
// import { UserManagerComponent } from './user-manager/user-manager.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { PlaceManageComponent } from './place-manage/place-manage.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'app-home',
    component: HomeComponent,
    children: [
      {path: 'app-device-manage', component: DeviceManageComponent},
      {path: 'app-device-detail/:deviceGuid', component: DeviceDetailComponent},
      {path: 'app-user-manage', component: UserManageComponent},
      {path: 'app-place-manage', component: PlaceManageComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
