import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componanents/home/home.component';
import { StartProjectComponent } from './componanents/start-project/start-project.component';
import { DiscoveryComponent } from './componanents/discovery/discovery.component';
import { AuthContainerComponent } from './auth/auth-container/auth-container.component';
import { LoginngComponent } from './auth/loginng/loginng.component';
import { RegisterngComponent } from './auth/registerng/registerng.component';
import { AboutComponent } from './componanents/about/about.component';
import { ProjectDetailsComponent } from './componanents/project-details/project-details.component';
import { ProjectSupportComponent } from './componanents/project-support/project-support.component';
import { AdminLayoutComponent } from './componanents/admin/admin-layout/admin-layout.component';
import { AllUsersComponent } from './componanents/admin/all-users/all-users.component';
import { ProjectManagementComponent } from './componanents/admin/project-management/project-management.component';
import { ContributionComponent } from './componanents/admin/contribution/contribution.component';
import { ModifyProjectComponent } from './componanents/modify-project/modify-project.component';
import { AuthGuard } from './guard/auth.guard';
import { SettingsComponent } from './componanents/settings/settings.component';
import { WelcomeComponent } from './componanents/admin/welcome/welcome.component';

const routes: Routes = [
{ path: "", component: HomeComponent },
  { 
    path: 'start-project', 
    component: StartProjectComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['ProjectOwner'] }
  },
  { path: 'discover', component: DiscoveryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'project/:id', component: ProjectDetailsComponent },
  { 
    path: 'project-support/:id', 
    component: ProjectSupportComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Backer'] }
  },
  { 
    path: 'modify-project/:id', 
    component: ModifyProjectComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ProjectOwner'] }
  },
  {  
    path: 'dashboard',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'users', component: AllUsersComponent },
      { path: 'manage', component: ProjectManagementComponent },
      { path: 'contribution', component: ContributionComponent }
    ]
  },


  {
    path: 'auth',
    component: AuthContainerComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginngComponent },
      { path: 'register', component: RegisterngComponent }
    ]
  },
  { path: 'login', redirectTo: 'auth/login' },
  { path: 'register', redirectTo: 'auth/register' },
    {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
