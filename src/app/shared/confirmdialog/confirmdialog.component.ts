import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {  // Changed from ConfirmdialogComponent to ConfirmDialogData
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'accent' | 'warn';
}

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData  // Use the correct interface
  ) {
    // Set default values if not provided
    this.data.cancelText = this.data.cancelText ?? 'Cancel';
    this.data.confirmColor = this.data.confirmColor ?? 'primary';
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}