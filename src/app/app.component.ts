import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crow';
    showFooter = true;

constructor(readonly router: Router) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {
      const navEndEvent = event as NavigationEnd;
      this.showFooter = !navEndEvent.urlAfterRedirects.startsWith('/dashboard');

    });
}
}
