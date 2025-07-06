import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../../../models/project.model';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.css']
})
export class EditProjectDialogComponent implements OnInit {
  editForm: FormGroup;
  fundingTypes = ['Donation', 'Reward', 'Equity', 'Loan'];
  statusOptions = ['Draft', 'Pending', 'Approved', 'Rejected', 'Active', 'Successful', 'Failed'];
      categories = [
    { categoryId: 5, name: 'Technology', icon: 'computer' },
    { categoryId: 2, name: 'Art & Creative', icon: 'palette' },
    { categoryId: 6, name: 'Social Causes', icon: 'favorite' },
    { categoryId: 8, name: 'Entrepreneurship', icon: 'business' },
    { categoryId: 9, name: 'Education', icon: 'school' }
  ];
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<EditProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project }
  ) {
    this.editForm = this.fb.group({
      title: [data.project.title, Validators.required],
      shortDescription: [data.project.shortDescription, Validators.required],
      description: [data.project.description, Validators.required],
      categoryId: [data.project.categoryId, Validators.required],
      fundingType: [data.project.fundingType, Validators.required],
      fundingGoal: [data.project.fundingGoal, [Validators.required, Validators.min(1)]],
      status: [data.project.status, Validators.required],
      verificationStatus: [data.project.verificationStatus],
      risksChallenges: [data.project.risksChallenges],
      isFeatured: [data.project.isFeatured]


    });
  }

  ngOnInit(): void {
  }



  onSave(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}