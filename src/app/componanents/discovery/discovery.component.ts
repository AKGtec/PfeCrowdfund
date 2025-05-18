import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})
export class DiscoveryComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  categories = [
    { id: 5, name: 'Technology', icon: 'computer' },
    { id: 2, name: 'Art & Creative', icon: 'palette' },
    { id: 6, name: 'Social Causes', icon: 'favorite' },
    { id: 8, name: 'Entrepreneurship', icon: 'business' },
    { id: 9, name: 'Education', icon: 'school' }
  ];
  
  sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'ending', label: 'Ending Soon' },
    { value: 'funded', label: 'Most Funded' }
  ];

  filtersForm: FormGroup;
  isLoading = true;
  currentPage = 1;
  itemsPerPage = 12;
  totalProjects = 0;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.filtersForm = this.fb.group({
      search: [''],
      category: [''],
      sort: ['popular'],
      fundingType: [''],
      minGoal: [''],
      maxGoal: ['']
    });
  }

  ngOnInit(): void {
    this.loadProjects();
    
    this.filtersForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  loadProjects(): void {
    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.filteredProjects = [...projects];
        this.totalProjects = projects.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    const filters = this.filtersForm.value;
    let results = [...this.projects];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      results = results.filter(project => 
        project.title.toLowerCase().includes(searchTerm) || 
        project.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters.category) {
      results = results.filter(project => project.categoryId === +filters.category);
    }

    // Apply funding type filter
    if (filters.fundingType) {
      results = results.filter(project => project.fundingType === filters.fundingType);
    }

    // Apply goal range filter
    if (filters.minGoal) {
      results = results.filter(project => project.fundingGoal >= +filters.minGoal);
    }
    if (filters.maxGoal) {
      results = results.filter(project => project.fundingGoal <= +filters.maxGoal);
    }

    // Apply sorting
    switch (filters.sort) {
      case 'newest':
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        results.sort((a, b) => b.viewsCount - a.viewsCount);
        break;
      case 'ending':
        results.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        break;
      case 'funded':
        results.sort((a, b) => (b.amountRaised / b.fundingGoal) - (a.amountRaised / a.fundingGoal));
        break;
    }

    this.filteredProjects = results;
    this.currentPage = 1;
  }

  resetFilters(): void {
    this.filtersForm.reset({
      search: '',
      category: '',
      sort: 'popular',
      fundingType: '',
      minGoal: '',
      maxGoal: ''
    });
  }

  viewProject(projectId: number): void {
    this.router.navigate(['/project/', projectId]);
  }

  get paginatedProjects(): Project[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProjects.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProjects.length / this.itemsPerPage);
  }

  progressPercentage(project: Project): number {
    return Math.min(100, (project.amountRaised / project.fundingGoal) * 100);
  }

  get daysLeft(): (project: Project) => number {
    return (project: Project) => {
      const endDate = new Date(project.endDate);
      const today = new Date();
      const diffTime = endDate.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };
  }

  getNumberArray(n: number): number[] {
    return Array(n).fill(0).map((_, i) => i + 1);
  }
    getCategoryById(categoryId: number) {
    return this.categories.find(c => c.id === categoryId);
  }
}