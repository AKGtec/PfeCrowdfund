
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContributionService } from '../../../services/contribution.service';
import { Contribution } from '../../../models/contribution.model';


@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.css']
})
export class ContributionComponent implements OnInit {
  dataSource = new MatTableDataSource<Contribution>();
  displayedColumns: string[] = ['id', 'project', 'user', 'amount', 'date', 'paymentMethod', 'status', 'actions'];
  isLoading = true;
  searchQuery = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    readonly contributionService: ContributionService,
    readonly dialog: MatDialog,
    readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadContributions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

    loadContributions(): void {
    this.isLoading = true;
    this.contributionService.getAllContributions().subscribe({
      next: (contributions) => {
        this.dataSource.data = contributions;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading contributions:', error);
        this.snackBar.open('Error loading contributions', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  updateStatus(contribution: Contribution, newStatus: string): void {
    contribution.status=newStatus
    this.contributionService.updateContributionStatus(contribution.contributionId, contribution)
      .subscribe({
        next: () => {
          this.snackBar.open('Status updated successfully', 'Close', { duration: 3000 });
          this.loadContributions();
        },
        error: () => {
          this.snackBar.open('Error updating status', 'Close', { duration: 3000 });
        }
      });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  deleteContribution(id: number): void {
  if (confirm('Are you sure you want to delete this contribution?')) {
    this.contributionService.deleteContribution(id).subscribe({
      next: () => {
        this.snackBar.open('Contribution deleted successfully', 'Close', { duration: 3000 });
        this.loadContributions();
      },
      error: (error) => {
        console.error('Error deleting contribution:', error);
        this.snackBar.open('Error deleting contribution', 'Close', { duration: 3000 });
      }
    });
  }
}
}
