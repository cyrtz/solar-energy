import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

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
import { PlaceManageComponent } from './place-manage/place-manage.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { RegisterDialogComponent } from './dialog/register-dialog/register-dialog/register-dialog.component';
import { NewPlaceDialogComponent } from './dialog/new-place-dialog/new-place-dialog/new-place-dialog.component';

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
import { MatSelect, MatSelectModule, matSelectAnimations } from '@angular/material/select';
import { DeletePlaceDialogComponent } from './dialog/delete-place-dialog/delete-place-dialog.component';

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
    PlaceManageComponent,
    UserManageComponent,
    NewPlaceDialogComponent,
    DeletePlaceDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
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
    MatSelectModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'zh-TW' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
