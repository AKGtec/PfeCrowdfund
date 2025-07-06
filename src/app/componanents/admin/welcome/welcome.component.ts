import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  dashboardStats = {
    totalUsers: 256,
    totalProjects: 124,
    pendingApprovals: 8,
    totalFunding: 450000
  };

  recentProjects = [
    {
      title: 'Eco-Friendly Water Bottle',
      creator: 'John Doe',
      status: 'Pending',
      submitDate: new Date(),
      category: 'Environment'
    }
    // Add more mock data as needed
  ];

  recentUsers = [
    {
      name: 'Jane Smith',
      type: 'Creator',
      joinDate: new Date(),
      projectCount: 2
    }
    // Add more mock data as needed
  ];

  constructor() {}


}
