import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class EditProjectComponent implements OnInit {
  projectForm: FormGroup;
  projectId!: string;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    this.loadProject();
  }

  loadProject() {
    this.projectService.getProject(this.projectId).subscribe((project) => {
      if (project) {
        this.projectForm.patchValue({
          title: project.data.title || '',
          description: project.data.description || '',
          status: project.data.status || '',
        });
      }
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const updatedProject = {
        ...this.projectForm.getRawValue(),
      };

      this.projectService
        .updateProject(this.projectId, updatedProject)
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.error('Failed to update project:', error);
            alert('Failed to update project. Please try again.');
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard']);
  }
}
