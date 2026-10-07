import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TaskService } from '../../core/task';
import { Task } from '../../models/task';

import { UserService } from '../../core/user';
import { User } from '../../models/user';

@Component({
  selector: 'app-task-list',
  imports: [RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  private readonly taskService = inject(TaskService);
  private readonly userService = inject(UserService);

  protected readonly tasks = signal<Task[]>([]);
  protected readonly loading = signal(true);
  protected readonly users = signal<User[]>([]);
  protected readonly successMessage = signal('');
  protected readonly errorMessage = signal('');

  constructor() {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.taskService.getAll().subscribe({
      next: (tasks) => { 
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: () => { 
        this.loading.set(false);
        this.errorMessage.set('Error al cargar las tareas.');
      },
    });

    

    this.userService.getAll().subscribe({
      next: (users) => {
        this.users.set(users);
      },
      error: () => {
      if (!this.errorMessage()) {
        this.errorMessage.set('Error al cargar los usuarios.');
      }
    },
    });
  }

  protected toggleCompleted(task: Task, checkbox: HTMLInputElement): void {
    this.taskService.update(task.id, { completed: !task.completed }).subscribe({
      next: (updated) => {
        this.tasks.update((tasks) =>
          tasks.map((t) => (t.id === updated.id ? updated : t)),
        );
        this.successMessage.set(
          `La tarea se actualizó correctamente.`,
        );
        setTimeout(() => {
          this.successMessage.set('');
        }, 3000);
      },
      error: () => {
        checkbox.checked = task.completed;
        this.errorMessage.set('Error al actualizar la tarea.');
        setTimeout(() => {
          this.errorMessage.set('');
        }, 3000);
      }
    });
  }

  protected deleteTask(id: number): void {
    this.taskService.delete(id).subscribe({
      next: ()=> {
        this.tasks.update((tasks) =>
          tasks.filter((t) => t.id !== id),
        );
        this.successMessage.set('La tarea se eliminó correctamente.');
        setTimeout(() => {
          this.successMessage.set('');
        }, 3000);
      },
      error: () => {
        this.errorMessage.set('Error al eliminar la tarea.');
        
        setTimeout(() => {
          this.errorMessage.set('');
        }, 3000);
      }
    });
  }

  protected assignUser(task: Task, userId: string): void {

    if (!userId) return;

    this.taskService.assignUser(task.id, Number(userId)).subscribe({
      next: (updated) => {
        this.tasks.update((tasks) =>
            tasks.map((t) => (t.id === updated.id ? updated : t)),
          );
          const user = this.users().find(
            (u) => u.id === Number(userId),
          );
          this.successMessage.set(
            `La tarea se asignó correctamente a ${user?.name ?? 'el usuario'}.`,
          );
          setTimeout(() => {
            this.successMessage.set('');
          }, 3000);
      },
      error: (err) => {
        this.errorMessage.set(
          `Error al asignar la tarea: ${err.error?.message ?? 'Error desconocido'}`,
        );
        setTimeout(() => {
          this.errorMessage.set('');
        }, 3000);
      }
    });
    
  }
}