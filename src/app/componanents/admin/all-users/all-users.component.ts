import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  isLoading = true;
  searchQuery = '';
  displayedColumns: string[] = ['id', 'name', 'email', 'userType', 'status', 'actions'];

  constructor(
    readonly userService: UserService,
    readonly dialog: MatDialog,
    readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user =>
      user.firstName?.toLowerCase().includes(query) ??
      user.lastName?.toLowerCase().includes(query) ??
      user.email?.toLowerCase().includes(query) ??
      user.userType?.toLowerCase().includes(query)
    );
  }

  openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.userId=user.userId
        result.birthDate=user.birthDate
        result.bio=user.bio
        result.status=user.status
        result.profilePicture=user.profilePicture
        this.userService.updateUser(user.userId, result).subscribe({
          next: () => {
            this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
            this.loadUsers();
          },
          error: () => {
            this.snackBar.open('Error updating user', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
        this.loadUsers();
      },
      error: () => {
        this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
      }
    });
  }

  toggleUserStatus(user: any): void {
    user.status=user.status.toLowerCase() === 'active' ? 'Suspended' : 'Active';
    const newStatus = user.status
    this.userService.updateUserStatus(user.userId, user).subscribe({
      next: () => {
        this.snackBar.open(`User status changed to ${newStatus}`, 'Close', { duration: 3000 });
        this.loadUsers();
      },
      error: () => {
        this.snackBar.open('Error updating user status', 'Close', { duration: 3000 });
      }
    });
  }

  getUserProfilePicture(profilePicture: string): string {
    return profilePicture?.startsWith('http') ? profilePicture : 'assets/default-avatar.jpg';
  }
}
