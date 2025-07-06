import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 isLoggedIn = false;
  userRole: string | null = null;
  showMobileMenu = false;
  showDropdown = false;
  projects:Project[]=[]
  pro?:Project

    constructor(
    readonly router: Router,
    readonly authService: AuthService,
    readonly projectservice :ProjectService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userRole = this.authService.getUserRole();
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.showMobileMenu = false;
    this.showDropdown = false;
  }
  navigateTop(route: string) {

      this.projectservice.getProjects().subscribe({
    next: (project) => {
      this.projects = project;

    }, error: (err) => {
      console.error('Error loading projects:', err);
    }})
    this.projects = this.projects.filter(project => project.userId == Number(localStorage.getItem('userId')));

    route =route+this.projects[0].projectId
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
    isAdmin(): boolean {
    return this.userRole === 'Admin';
  }
  isBacker(): boolean {
    return this.userRole === 'Backer';
  }

  isCreator(): boolean {
    return this.userRole === 'ProjectOwner';
  }

  logout() {
    // Implement your logout logic here
    this.authService.logout();
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