import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
// import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
  imports: [ReactiveFormsModule, CommonModule], // Add ReactiveFormsModule here ]
})
export class DashboardComponent {
  projects: any[] = [];
  username: string = 'User';

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.onGetUser();
  }

  onGetUser() {
    this.projectService.getUser().subscribe({
      next: (response) => {
        console.log('User API Response:', response);
        this.username = response?.data?.name || 'User';
        this.projects = response?.data?.projects || [];
      },
      error: (err) => {
        console.error('Failed to fetch user:', err);
      },
    });
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  onCreateProject() {
    this.router.navigate(['/create-project']);
  }

  onEditProject(id: string) {
    this.router.navigate(['/edit-project', id]);
  }
}
