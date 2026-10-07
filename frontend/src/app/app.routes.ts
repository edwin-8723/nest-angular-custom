import { Routes } from '@angular/router';
import { TaskList } from './features/task-list/task-list';
import { TaskForm } from './features/task-form/task-form';
import { InversionLookup } from './features/inversion-lookup/inversion-lookup';
import { InversionList } from './features/inversion-list/inversion-list';
import { InversionForm } from './features/inversion-form/inversion-form';
import { InversionAll } from './features/inversion-all/inversion-all';

export const routes: Routes = [
  { path: '', component: TaskList },
  { path: 'tasks/new', component: TaskForm },
  { path: 'tasks/:id/edit', component: TaskForm },
  { path: 'inversiones/todas', component: InversionAll },
  { path: 'inversiones', component: InversionLookup },
  { path: 'users/:userId/inversiones', component: InversionList },
  { path: 'users/:userId/inversiones/new', component: InversionForm },
  { path: '**', redirectTo: '' },
];
