import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service.service';
import { matchValidator } from '../../utils/Validators';

@Component({
  selector: 'app-register',
  templateUrl: './registerng.component.html',
  styleUrls: ['./registerng.component.css']
})
export class RegisterngComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
     this.registerForm = this.fb.group({
      username: ['', [Validators.required]], // Changed from name to firstName
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Add phone validation
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      userType: ['Backer'],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: matchValidator('password', 'confirmPassword')
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

      const {
    username, 
    lastName, 
    phoneNumber, 
    userType, 
    email, 
    password, 
    confirmPassword 
      } = this.registerForm.value;

    this.authService.register(
    username,
    lastName,
    phoneNumber,
    userType,
    email,
    password,
    confirmPassword
    ).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}