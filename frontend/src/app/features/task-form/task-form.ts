import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../core/task';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  private readonly fb = inject(FormBuilder);
  private readonly taskService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly errorMessage = signal('');
  protected readonly loadFailed = signal(false);
  protected readonly taskId = signal<number | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.taskId.set(id);
      this.taskService.getOne(id).subscribe({
        next: (task) => {
          this.form.patchValue({
            title: task.title,
            description: task.description ?? '',
          });
        },
        error: () => {
          this.loadFailed.set(true);
          this.errorMessage.set('Error al cargar la tarea.');
        },
      });
    }
  }

  protected submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.errorMessage.set('');

    const value = this.form.getRawValue();
    const id = this.taskId();

    const request$ = id
      ? this.taskService.update(id, value)
      : this.taskService.create(value);

    request$.subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.errorMessage.set('Error al guardar la tarea.');
      },
    });
  }
}