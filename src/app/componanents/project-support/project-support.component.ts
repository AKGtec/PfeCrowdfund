import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-support',
  templateUrl: './project-support.component.html',
  styleUrls: ['./project-support.component.css']
})
export class ProjectSupportComponent implements OnInit {
   projectId: number=6;
   fundingType: string="Reward";
   rewards: any[] = [];

  supportForm!: FormGroup;
  paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer'];
  selectedReward: any = null;
  isProcessing = false;
  errorMessage = '';
  showSuccess = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProject(this.projectId);
  }

  loadProject(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe({
      next: (project) => {
 

        this.supportForm = <any>project;

      },
      error: (err) => {
        console.error('Error loading project:', err);

      }
    });
  }

  initForm(): void {
    this.supportForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      paymentMethod: ['', Validators.required],
      message: [''],
      isAnonymous: [false],
      rewardId: [null]
    });

    // For reward-based projects, set min amount when reward is selected
    this.supportForm.get('rewardId')?.valueChanges.subscribe(rewardId => {
      if (rewardId) {
        const reward = this.rewards.find(r => r.rewardId === rewardId);
        if (reward) {
          this.selectedReward = reward;
          this.supportForm.patchValue({
            amount: reward.minimumAmount,
            rewardId: reward.rewardId
          });
        }
      } else {
        this.selectedReward = null;
        this.supportForm.patchValue({ amount: '' });
      }
    });
  }


  onSubmit(): void {
    if (this.supportForm.invalid) {
      this.supportForm.markAllAsTouched();
      return;
    }

   /* if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }*/

    this.isProcessing = true;
    this.errorMessage = '';

    const supportData = {
      projectId: this.projectId,
      amount: this.supportForm.value.amount,
      paymentMethod: this.supportForm.value.paymentMethod,
      message: this.supportForm.value.message,
      isAnonymous: this.supportForm.value.isAnonymous,
      rewardId: this.supportForm.value.rewardId
    };

    this.projectService.supportProject(supportData).subscribe({
      next: (response) => {
        this.isProcessing = false;
        this.showSuccess = true;
        this.supportForm.reset();
        // Redirect to payment if needed
        if (response.paymentUrl) {
          window.location.href = response.paymentUrl;
        }
      },
      error: (err) => {
        this.isProcessing = false;
        this.errorMessage = err.error.message || 'An error occurred during payment processing.';
      }
    });
  }

  get amount() {
    return this.supportForm.get('amount');
  }

  get paymentMethod() {
    return this.supportForm.get('paymentMethod');
  }
}