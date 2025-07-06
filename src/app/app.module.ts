import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componanents/home/home.component';
import { HeaderComponent } from './componanents/header/header.component';
import { FooterComponent } from './componanents/footer/footer.component';
import { StartProjectComponent } from './componanents/start-project/start-project.component';
import { DiscoveryComponent } from './componanents/discovery/discovery.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { LoginngComponent } from './auth/loginng/loginng.component';
import { RegisterngComponent } from './auth/registerng/registerng.component';
import { AuthContainerComponent } from './auth/auth-container/auth-container.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AboutComponent } from './componanents/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ProjectDetailsComponent } from './componanents/project-details/project-details.component';
import { MarkdownPipe } from './shared/pipes/markdown.pipe';
import { SafeUrlPipe } from './shared/pipes/safe-url.pipe';
import { CategoryNamePipe } from './shared/pipes/category-name.pipe';
import { ProjectSupportComponent } from './componanents/project-support/project-support.component';
import { AdminSidebarComponent } from './componanents/admin/admin-sidebar/admin-sidebar.component';
import { AllUsersComponent } from './componanents/admin/all-users/all-users.component';
import { EditUserDialogComponent } from './componanents/admin/all-users/edit-user-dialog/edit-user-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './componanents/admin/admin-layout/admin-layout.component';
import { ProjectManagementComponent } from './componanents/admin/project-management/project-management.component';
import { EditProjectDialogComponent } from './componanents/admin/project-management/edit-project-dialog/edit-project-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ContributionComponent } from './componanents/admin/contribution/contribution.component';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmDialogComponent } from './shared/confirmdialog/confirmdialog.component';
import { ModifyProjectComponent } from './componanents/modify-project/modify-project.component';
import { AuthInterceptor } from './interceptor/auth';
import { SettingsComponent } from './componanents/settings/settings.component';
import { MaterialModule } from '../app/models/Material.modole';
import { WelcomeComponent } from './componanents/admin/welcome/welcome.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    StartProjectComponent,
    DiscoveryComponent,
    TruncatePipe,
    LoginngComponent,
    RegisterngComponent,
    AuthContainerComponent,
    AboutComponent,
    ProjectDetailsComponent,
    MarkdownPipe,
    SafeUrlPipe,
    CategoryNamePipe,
    ProjectSupportComponent,
    AdminSidebarComponent,
    EditUserDialogComponent,
    AllUsersComponent,
    AdminLayoutComponent,
    ProjectManagementComponent,
    EditProjectDialogComponent,
    ContributionComponent,
    ConfirmDialogComponent,
    ModifyProjectComponent,
    SettingsComponent,
    WelcomeComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    MatMenuModule,
    MaterialModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
