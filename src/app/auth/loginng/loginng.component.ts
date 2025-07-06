import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './loginng.component.html',
  styleUrls: ['./loginng.component.css']
})
export class LoginngComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
    hidePassword = true;
  returnUrl: string = '/';


  constructor(
    readonly fb: FormBuilder,
    readonly authService: AuthService,
    readonly router: Router,
    readonly route: ActivatedRoute

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ?? '/';

  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        const userRole = this.authService.getUserRole();
        
        // Redirect based on role if no return URL
        if (this.returnUrl === '/') {
          switch(userRole) {
            case 'Admin':
              this.router.navigate(['/dashboard']);
              break;
            case 'ProjectOwner':
              this.router.navigate(['/start-project']);
              break;
            case 'Backer':
              this.router.navigate(['/discover']);
              break;
            default:
              this.router.navigate(['/']);
          }
        } else {
          // Navigate to return URL if it exists
          this.router.navigate([this.returnUrl]);
        }
      },
      error: (err) => {
        this.errorMessage = err.message ?? 'Login failed. Please try again.';
        this.isLoading = false;
      }
    });
  }


}