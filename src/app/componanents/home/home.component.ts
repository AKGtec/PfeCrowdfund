import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router){}
   featuredCategories = [
    { id: 1, name: 'Technology', icon: 'computer', count: 124 },
    { id: 2, name: 'Art & Creative', icon: 'palette', count: 89 },
    { id: 3, name: 'Social Causes', icon: 'favorite', count: 156 },
    { id: 4, name: 'Entrepreneurship', icon: 'business', count: 72 },
    { id: 9, name: 'Education', icon: 'school' , count: 52}
  ];

  trendingProjects = [
    { 
      id: 1, 
      title: 'Smart Home Automation System', 
      description: 'Revolutionary IoT solution for home automation', 
      category: 'Technology',
      progress: 75,
      amountRaised: 37500,
      goal: 50000,
      daysLeft: 12,
      imageUrl: 'assets/project1.jpg'
    },
    { 
      id: 2, 
      title: 'Children Education Fund', 
      description: 'Help underprivileged children get access to education', 
      category: 'Social Causes',
      progress: 45,
      amountRaised: 22500,
      goal: 50000,
      daysLeft: 25,
      imageUrl: 'assets/project2.jpg'
    },
    { 
      id: 3, 
      title: 'Independent Film Production', 
      description: 'Support our indie film about urban life challenges', 
      category: 'Art & Creative',
      progress: 92,
      amountRaised: 46000,
      goal: 50000,
      daysLeft: 5,
      imageUrl: 'assets/project3.jpg'
    }
  ];

  successStories = [
    {
      id: 1,
      title: 'Eco-Friendly Packaging',
      raised: 65000,
      backers: 420,
      imageUrl: 'assets/success1.jpg'
    },
    {
      id: 2,
      title: 'Community Garden',
      raised: 32000,
      backers: 215,
      imageUrl: 'assets/success2.jpg'
    },
    {
      id: 3,
      title: 'AI Learning App',
      raised: 120000,
      backers: 890,
      imageUrl: 'assets/success3.jpg'
    }
  ];
    navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
