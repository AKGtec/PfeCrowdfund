import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = false; // You'll replace this with actual auth logic
  showMobileMenu = false;
  showDropdown = false;

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.showMobileMenu = false;
    this.showDropdown = false;
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
    // Close dropdown when mobile menu opens
    if (this.showMobileMenu) {
      this.showDropdown = false;
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    // Close mobile menu when dropdown opens
    if (this.showDropdown) {
      this.showMobileMenu = false;
    }
  }

  logout() {
    // Implement your logout logic here
    this.isLoggedIn = false;
    this.showDropdown = false;
    this.router.navigate(['/']);
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-dropdown') && !target.closest('.logged-out')) {
      this.showDropdown = false;
    }
  }
}