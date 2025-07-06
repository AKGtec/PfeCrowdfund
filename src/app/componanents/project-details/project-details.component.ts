import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project!: Project;
  isLoading = true;
  daysLeft: number=0;
  progressPercentage: number = 0;
    categories = [
    { id: 5, name: 'Technology', icon: 'computer' },
    { id: 2, name: 'Art & Creative', icon: 'palette' },
    { id: 6, name: 'Social Causes', icon: 'favorite' },
    { id: 8, name: 'Entrepreneurship', icon: 'business' },
    { id: 9, name: 'Education', icon: 'school' }
  ];

  constructor(
    readonly route: ActivatedRoute,
    readonly projectService: ProjectService,
    readonly router: Router
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.loadProject(projectId);
  }

  editme(){
    return this.project.userId===Number(localStorage.getItem("userId"))
  }
loadProject(projectId: number): void {
  this.projectService.getProjectById(projectId).subscribe({
    next: (project) => {
      if (project.videoUrl?.includes('watch?v=')) {
        const videoId = project.videoUrl.split('watch?v=')[1];
        project.videoUrl = `https://www.youtube.com/embed/${videoId}`;
      }
      this.project = project;
      this.calculateProjectMetrics();
      
      // Update viewCount on the server
      const updatedProject: Partial<Project> = {
        ...project,
        viewsCount: (project.viewsCount || 0) + 1
      };
      
      this.projectService.updateProject(projectId, updatedProject).subscribe({
        next: (response) => {
          this.project = response; // Update local project with server response
          console.log("View count updated successfully");
        },
        error: (err) => {
          console.error('Error updating view count:', err);
        }
      });
      
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error loading project:', err);
      this.isLoading = false;
    }
  });
}

  calculateProjectMetrics(): void {
    // Calculate days left
    const endDate = new Date(this.project.endDate);
    const today = new Date();
    this.daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate progress percentage
    this.progressPercentage = Math.min(100, (this.project.amountRaised / this.project.fundingGoal) * 100);
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
      navigateTo(route: string) {
        route=route+this.project.projectId
     this.router.navigate([route]);
  }
  
      navigateTop(route: string) {
        route=route+this.project.projectId
    this.router.navigate([route]);
  }
      getCategoryById(categoryId: number) {
        console.log(this.categories.find(c => c.id === categoryId))
    return this.categories.find(c => c.id === categoryId);

  }
}