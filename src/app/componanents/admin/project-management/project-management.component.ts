import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirmdialog/confirmdialog.component';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../../models/project.model';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Project>();
    categories = [
    { id: 5, name: 'Technology', icon: 'computer' },
    { id: 2, name: 'Art & Creative', icon: 'palette' },
    { id: 6, name: 'Social Causes', icon: 'favorite' },
    { id: 8, name: 'Entrepreneurship', icon: 'business' },
    { id: 9, name: 'Education', icon: 'school' }
  ];
  displayedColumns: string[] = [
    'projectId', 
    'title', 
    'creator', 
    'category', 
    'funding', 
    'status', 
    'actions'
  ];
  isLoading = true;
  searchQuery = '';
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    readonly projectService: ProjectService,
    readonly dialog: MatDialog,
    readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.setupSearchFilter();

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
 loadProjects(): void {
    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: (projects) => {
      this.dataSource.data = projects;
        this.dataSource.paginator = this.paginator;
        this.setupSearchFilter(); // Move this here after data is loaded
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.isLoading = false;
      }
    });
  }

    setupSearchFilter() {
    this.dataSource.filterPredicate = (data: Project, filter: string) => {
      const searchStr = filter.toLowerCase();
      return data.title.toLowerCase().includes(searchStr) ||
             data.status.toLowerCase().includes(searchStr);
    };
  }

    onSearch(): void {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditDialog(project: Project): void {
    const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      width: '800px',
      data: { project }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
  result.projectId=project.projectId
  result.userId=project.userId
  result.amountRaised=project.amountRaised
  result.startDate=project.startDate
  result.endDate=project.endDate
  result.coverImage=project.coverImage
  result.videoUrl=project.videoUrl
  result.createdAt=project.createdAt
  result.updatedAt=project.updatedAt
  result.viewsCount=project.viewsCount
        console.log(result)
        this.projectService.updateProject(project.projectId, result).subscribe({
          next: () => {
            this.snackBar.open('Project updated successfully', 'Close', { duration: 3000 });
            this.loadProjects();
          },
          error: (err) => {
            this.snackBar.open('Error updating project', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

confirmDelete(project: Project): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      title: 'Confirm Delete',
      message: `Are you sure you want to delete "${project.title}"?`,
      confirmText: 'Delete',
      confirmColor: 'warn'
    }
  });

  dialogRef.afterClosed().subscribe(confirmed => {
    if (confirmed) {
      this.deleteProject(project.projectId);
    }
  });
}

  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        this.snackBar.open('Project deleted successfully', 'Close', { duration: 3000 });
        this.loadProjects();
      },
      error: (err) => {
        this.snackBar.open('Error deleting project', 'Close', { duration: 3000 });
      }
    });
  }

  updateProjectStatus(project: Project, status: string): void {
    project.status=status
    this.projectService.updateProject(project.projectId, project).subscribe({
      next: () => {
        this.snackBar.open(`Project status updated to ${status}`, 'Close', { duration: 3000 });
        this.loadProjects();
      },
      error: (err) => {
        this.snackBar.open('Error updating project status', 'Close', { duration: 3000 });
      }
    });
  }

  getProgressPercentage(project: Project): number {
    return Math.min(100, (project.amountRaised / project.fundingGoal) * 100);
  }
  getcatname(catid:number){
    return this.categories.filter((x)=>x.id === catid)[0].name

  }
}