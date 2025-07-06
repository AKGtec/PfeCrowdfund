import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service.service';
import { Project } from 'src/app/models/project.model';
import { ContributionService } from 'src/app/services/contribution.service';

@Component({
  selector: 'app-project-support',
  templateUrl: './project-support.component.html',
  styleUrls: ['./project-support.component.css']
})
export class ProjectSupportComponent implements OnInit {
   projectId!: number;
   fundingType: string="Reward";
   rewards: any[] = [];
   project?: Project;

  supportForm!: FormGroup;
  paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer'];
  selectedReward: any = null;
  isProcessing = false;
  errorMessage = '';
  showSuccess = false;

  constructor(
    readonly contributionService:ContributionService,
    readonly fb: FormBuilder,
    readonly projectService: ProjectService,
    readonly router: Router,
    readonly authService: AuthService,
    readonly route: ActivatedRoute  

  ) {}

  ngOnInit(): void {
    this.initForm();
    this.projectId = this.route.snapshot.params['id'];
   this.loadProject(this.projectId)
  
  }

  loadProject(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe({
      next: (project) => {
        
        this.project = project;  // Store project data
        console.log(this.project)
      },
      error: (err) => {
        console.error('Error loading project:', err);
      }
    });
  }

  initForm(): void {
    this.supportForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(100)]],
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
    this.isProcessing = true;
    this.errorMessage = '';

    const supportData = {
      projectId: Number(this.projectId),
      amount: this.supportForm.value.amount,
      transactionId:"string",
      status: "Pending",
      paymentMethod: this.supportForm.value.paymentMethod,
      isAnonymous: this.supportForm.value.isAnonymous,
      userId: Number(localStorage.getItem("userId"))
    };
    // First process the support transaction
    this.contributionService.createContributions(supportData).subscribe({
      next: () => {console.log("contribution created")},
          error: (updateErr) => {
              console.error('Error updating project amount:', updateErr);
              // Still show success since the support was processed
              this.isProcessing = false;
              this.showSuccess = true;
            }
          });
        // After successful support, update the project's amountRaised
        if (this.project) {
         this.project.amountRaised= (this.project.amountRaised || 0) + supportData.amount
         console.log(this.projectId)
          this.projectService.updateProject(this.projectId, this.project).subscribe({
            next: () => {
              
              this.isProcessing = false;
              this.showSuccess = true;
              this.supportForm.reset()
            },
            error: (updateErr) => {
              console.error('Error updating project amount:', updateErr);
              // Still show success since the support was processed
              this.isProcessing = false;
              this.showSuccess = true;
            }
    });
  }
}

  get amount() {
    return this.supportForm.get('amount');
  }

  get paymentMethod() {
    return this.supportForm.get('paymentMethod');
  }
}