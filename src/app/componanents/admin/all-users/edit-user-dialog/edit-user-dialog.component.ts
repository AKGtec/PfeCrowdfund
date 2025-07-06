import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  editForm: FormGroup;
  userTypes = ['Backer', 'ProjectOwner', 'Admin'];

  constructor(
    readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any }
  ) {
    this.editForm = this.fb.group({
      firstName: [data.user.firstName, Validators.required],
      lastName: [data.user.lastName, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
      userType: [data.user.userType, Validators.required],
      phoneNumber: [data.user.phoneNumber],

    });
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
