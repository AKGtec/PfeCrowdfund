import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-modify-project',
  templateUrl: './modify-project.component.html',
  styleUrls: ['./modify-project.component.css']
})
export class ModifyProjectComponent implements OnInit {
  projectForm: FormGroup;
  projectId: number;
  previewImage: string | null = null;
  imageFile: File | null = null;
  isSubmitting = false;
  originalProject: any;

  categories = [
    { id: 5, name: 'Technology' },
    { id: 2, name: 'Art & Creative' },
    { id: 6, name: 'Social Causes' },
    { id: 8, name: 'Entrepreneurship' },
    { id: 9, name: 'Education' }
  ];

  fundingTypes = [
    { id: 1, name: 'Donation' },
    { id: 2, name: 'Reward' },
    { id: 3, name: 'Equity' },
    { id: 4, name: 'Loan' }
  ];

  constructor(
    readonly fb: FormBuilder,
    readonly projectService: ProjectService,
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly snackBar: MatSnackBar
  ) {
    this.projectId = this.route.snapshot.params['id'];
    this.projectForm = this.createForm();
  }

  ngOnInit(): void {
       const projectId = this.route.snapshot.params['id'];
    this.loadProject(projectId);
    this.setupFormListeners();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      categoryId: [0, Validators.required],
      fundingType: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50)]],
      shortDescription: ['', [Validators.required, Validators.maxLength(100)]],
      fundingGoal: ['', [Validators.required, Validators.min(100)]],
      endDate: ['', Validators.required],
      videoUrl: [''],
      risksChallenges: ['']
    });
  }

  private loadProject(id:number): void {
    this.projectService.getProjectById(id).subscribe({
      next: (project) => {
        this.originalProject = project;
        this.previewImage = project.coverImage;
        
        this.projectForm.patchValue({
          title: project.title,
          categoryId: project.categoryId,
          fundingType: project.fundingType,
          description: project.description,
          shortDescription: project.shortDescription,
          fundingGoal: project.fundingGoal,
          endDate: project.endDate.split('T')[0],
          videoUrl: project.videoUrl,
          risksChallenges: project.risksChallenges
        });
      },
      error: (error) => {
        this.snackBar.open('Error loading project', 'Close', { duration: 3000 });
        console.error('Error loading project:', error);
      }
    });
  }

  private setupFormListeners(): void {
    this.projectForm.get('description')?.valueChanges.subscribe(desc => {
      if (desc) {
        const shortDesc = desc.substring(0, 100);
        this.projectForm.patchValue({ shortDescription: shortDesc }, { emitEvent: false });
      }
    });
  }

onSubmit(): void {
  if (this.projectForm.invalid) {
    this.snackBar.open('Please fill all required fields correctly', 'Close', { duration: 3000 });
    return;
  }

  this.isSubmitting = true;
    const updatedProject: Project = {
      ...this.originalProject,
      ...this.projectForm.value,
      projectId: this.projectId,
      // Preserve unchanged fields
      amountRaised: this.originalProject.amountRaised,
      status: this.originalProject.status,
      createdAt: this.originalProject.createdAt,
      isFeatured: this.originalProject.isFeatured,
      verificationStatus: this.originalProject.verificationStatus,
      viewsCount: this.originalProject.viewsCount,
      userId:this.originalProject.userId
    };

    this.projectService.updateProject(this.projectId, updatedProject).subscribe({
      next: ()=>  {this.router.navigate(["/"])},//this.handleUpdateSuccess.bind(this),
      error:(err)=> console.log("error") //this.handleUpdateError.bind(this)
    });
  }
 //}

/*private handleUpdateSuccess(response: Project): void {
  this.snackBar.open('Project updated successfully', 'Close', { duration: 3000 });
  this.router.navigate(['/dashboard/manage']);
  this.isSubmitting = false;
}

private handleUpdateError(error: any): void {
  this.snackBar.open('Error updating project', 'Close', { duration: 3000 });
  console.error('Error updating project:', error);
  this.isSubmitting = false;
}*/

  /*onFileChange(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      this.snackBar.open('Please upload a valid image file (JPEG, PNG, GIF)', 'Close', { duration: 3000 });
      return;
    }

    if (file.size > maxSize) {
      this.snackBar.open('Image size must be less than 5MB', 'Close', { duration: 3000 });
      return;
    }

    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }*/

  /*removeImage(): void {
    this.previewImage = null;
    this.imageFile = null;
    const fileInput = document.getElementById('coverImage') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }*/

  getMinEndDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}
