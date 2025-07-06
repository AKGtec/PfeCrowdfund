import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-start-project',
  templateUrl: './start-project.component.html',
  styleUrls: ['./start-project.component.css']
})
export class StartProjectComponent implements OnInit {
  projectForm: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  isSubmiting:boolean=true
  iduser = localStorage.getItem("userId")
    hasExistingProject = false;
  isLoading = true;

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
    readonly router: Router,
        readonly snackBar: MatSnackBar

  ) {
    this.checkExistingProject();
    this.projectForm = this.fb.group({
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

  ngOnInit(): void {
    this.projectForm.get('description')?.valueChanges.subscribe(desc => {
      const shortDesc = desc.substring(0, 100);
      this.projectForm.patchValue({
        shortDescription: shortDesc
      });
    });
  }
    private checkExistingProject(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.projectService.getProjectsByUserId(Number(userId)).subscribe({
      next: (projects) => {
        if (projects && projects.length > 0) {
          this.hasExistingProject = true;
          this.snackBar.open(
            'You already have an active project. You can only have one project at a time.',
            'Close',
            { duration: 5000 }
          );
          this.router.navigate(['/project', projects[0].projectId]);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error checking existing projects:', err);
        this.isLoading = false;
      }
    });
  }

onSubmit() {
      if (this.hasExistingProject) {
      this.snackBar.open(
        'You already have an active project. You cannot create another one.',
        'Close',
        { duration: 3000 }
      );
      return;
    }
  this.isSubmiting=false
  if (this.projectForm.invalid || !this.imageFile) {
    alert('Please fill all required fields and upload a cover image.');
    return;
  }

 const formData = new FormData();
formData.append('title', this.projectForm.get('title')?.value);
formData.append('description', this.projectForm.get('description')?.value);
formData.append('shortDescription', this.projectForm.get('shortDescription')?.value);
formData.append('categoryId', this.projectForm.get('categoryId')?.value);
formData.append('fundingType', this.projectForm.get('fundingType')?.value);
formData.append('fundingGoal', this.projectForm.get('fundingGoal')?.value);
formData.append('endDate', this.projectForm.get('endDate')?.value);
formData.append('videoUrl', this.projectForm.get('videoUrl')?.value);
formData.append('risksChallenges', this.projectForm.get('risksChallenges')?.value);

// Append the image file if selected
if (this.imageFile) {
formData.append('ImageFile', this.imageFile);}
formData.append('userId',this.iduser ??'0');

this.projectService.createProject(formData).subscribe({
  next: (res) => {
    console.log('Project created:', res);
     // ✅ Clear form fields
     this.isSubmiting=true
    this.projectForm.reset();

    // ✅ Clear image preview and file
    this.previewImage = null;
    this.imageFile = null;
    const fileInput = document.getElementById('coverImage') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    this.router.navigate(['']);
  },
  error: (err) => {
    console.error('Error submitting project:', err);
    alert('Something went wrong. Please check form fields and try again.');
  }
});
}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF)');
      return;
    }

    if (file.size > maxSize) {
      alert('Image size must be less than 5MB');
      return;
    }

    this.imageFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.previewImage = null;
    this.imageFile = null;
    const fileInput = document.getElementById('coverImage') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  getMinEndDate(): string {
    const today = new Date();
    const minDate = new Date(today.setDate(today.getDate() + 30));
    return minDate.toISOString().split('T')[0];
  }

  getMinDeliveryDate(): string {
    const endDate = this.projectForm.get('endDate')?.value;
    if (endDate) {
      const deliveryMinDate = new Date(endDate);
      deliveryMinDate.setDate(deliveryMinDate.getDate() + 1);
      return deliveryMinDate.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  }
}
