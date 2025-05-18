import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    ProjectSupportComponent
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
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
