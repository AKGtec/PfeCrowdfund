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

const routes: Routes = [
  {path:"",component:HomeComponent},
  { path: 'start-project', component: StartProjectComponent },
    { path: 'discover', component: DiscoveryComponent },
          { path: 'about', component: AboutComponent },
          { path: 'project/:id', component: ProjectDetailsComponent },
          { path: 'project-support', component: ProjectSupportComponent },
    { path: 'projects', redirectTo: 'discover', pathMatch: 'full' },

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
  { path: 'register', redirectTo: 'auth/register' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
