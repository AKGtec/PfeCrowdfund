import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project!: Project;
  isLoading = true;
  daysLeft: number=0;
  progressPercentage: number =0;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.loadProject(projectId);
  }

  loadProject(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe({
      next: (project) => {
        if (project.videoUrl.includes('watch?v=')) {
  const videoId = project.videoUrl.split('watch?v=')[1];
  project.videoUrl = `https://www.youtube.com/embed/${videoId}`;
}
        this.project = project;
        this.calculateProjectMetrics();
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
    this.router.navigate([route]);
  }
}