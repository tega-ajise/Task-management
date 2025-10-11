import { Route } from '@angular/router';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';
import { TaskViewComponent } from './components/taskView';
import { CreateTask } from './components/task';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'tasks',
    component: TaskViewComponent,
  },
  {
    path: 'tasks/new',
    component: CreateTask,
  },
  { path: 'tasks/:id', component: CreateTask },
  // defaults
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }, // simple 404 fallback to dashboard
];
// If I want to create routes I can add them here
// spec: https://angular.io/guide/router
// simple route config: { path: 'home', component: HomeComponent }
