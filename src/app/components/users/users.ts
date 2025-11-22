import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
  imports: [CommonModule],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  deleteUser(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    this.userService.delete(id).subscribe(() => this.fetchUsers());
  }
}
