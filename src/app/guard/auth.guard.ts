import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    readonly authService: AuthService,
    readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { 
        queryParams: { 
          returnUrl: state.url,
          message: 'Please login to access this page'
        }
      });
      return false;
    }

    // Check if route requires specific roles
    if (route.data['roles']) {
      const userRole = this.authService.getUserRole();
      
      if (!userRole || !route.data['roles'].includes(userRole)) {
        // Redirect based on role
        switch(userRole) {
          case 'Admin':
            this.router.navigate(['/dashboard']);
            break;
          case 'ProjectOwner':
            this.router.navigate(['/']);
            break;
          case 'Backer':
            this.router.navigate(['/discover']);
            break;
          default:
            this.router.navigate(['/']);
        }
        return false;
      }
    }

    return true;
  }
}