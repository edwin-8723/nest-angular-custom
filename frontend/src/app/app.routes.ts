import { Routes } from '@angular/router';
import { TaskList } from './features/task-list/task-list';
import { TaskForm } from './features/task-form/task-form';

export const routes: Routes = [
  { path: '', component: TaskList },
  { path: 'tasks/new', component: TaskForm },
  { path: 'tasks/:id/edit', component: TaskForm },
  { path: '**', redirectTo: '' },
];
