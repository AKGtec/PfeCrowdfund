import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService, UserSettings } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  isLoading = false;
  userSettings?: UserSettings;
  userId: string | null;

  constructor(
    readonly fb: FormBuilder,
    readonly userService: UserService,
    readonly snackBar: MatSnackBar,
    readonly router: Router
  ) {
    this.settingsForm = this.createForm();
    this.userId = localStorage.getItem('userId');
    
    if (!this.userId) {
      this.snackBar.open('Please log in to access settings', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    if (this.userId) {
      this.loadUserSettings();
    }
  }

  loadUserSettings() {
    this.isLoading = true;
    this.userService.getUserSettings().subscribe({
      next: (settings) => {
        // Verify the returned settings match the logged-in user
        if (settings.userId.toString() === this.userId) {
          this.userSettings = settings;
          this.settingsForm.patchValue({
            firstName: settings.firstName,
            lastName: settings.lastName,
            phoneNumber: settings.phoneNumber,
            birthDate: settings.birthDate ? new Date(settings.birthDate) : null,
            bio: settings.bio,
            email:settings.email
            
          });
        } else {
          this.snackBar.open('Unauthorized access', 'Close', { duration: 3000 });
          this.router.navigate(['/']);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading settings:', error);
        this.snackBar.open(
          error.status === 401 ? 'Please log in again' : 'Error loading settings', 
          'Close', 
          { duration: 3000 }
        );
        this.isLoading = false;
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }
    private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email:['',[Validators.required,Validators.email]],
      birthDate: [null],
      bio: ['', [Validators.maxLength(500)]]
    });
  }

onSubmit() {
  if (this.settingsForm.invalid || !this.userId) return;

  this.isLoading = true;
  
  // Create user update object
  const updateData = {
    ...this.settingsForm.value,
    userId: Number(this.userId),
    userType: this.userSettings?.userType,
    status: this.userSettings?.status,
    profilePicture: 'hhdfh',
    email:this.settingsForm.value.email,
    // Format birth date if present
    birthDate: this.settingsForm.value.birthDate ? 
      new Date(this.settingsForm.value.birthDate).toISOString() : 
      null
  };

  console.log('Update data:', updateData); // For debugging

  this.userService.updateUser(Number(this.userId), updateData).subscribe({
    next: (response) => {
      this.snackBar.open('Settings updated successfully', 'Close', { duration: 3000 });
      this.userSettings = { ...this.userSettings, ...this.settingsForm.value };
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error updating settings:', error);
      this.snackBar.open(
        error.status === 401 ? 'Please log in again' : 'Error updating settings', 
        'Close', 
        { duration: 3000 }
      );
      this.isLoading = false;
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
    }
  });
}
}