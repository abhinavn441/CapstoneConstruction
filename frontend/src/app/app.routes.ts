import { Routes } from '@angular/router';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { ProjectCreateComponent } from './features/projects/project-create/project-create.component';
import { ProjecById } from './features/projects/project-by-id/project-byId.component';
import { ProjectUpdateComponent } from './features/projects/project-update/project-update.component';
import { ProjectDelete } from './features/projects/project-delete/project-delete.component';
import { EngineerList } from './features/engineers/engineer-list/engineer-list.component';
import { EngineerCreate } from './features/engineers/engineer-create/engineer-create.component';
import { EngineerById } from './features/engineers/engineer-by-id/engineer-by-id.component';
import { EngineerUpdate } from './features/engineers/engineer-update/engineer-update.component';
import { EngineerDelete } from './features/engineers/engineer-delete/engineer-delete.component';
import { TaskList } from './features/tasks/task-list/task-list.component';
import { TaskById } from './features/tasks/task-by-id/task-by-id.component';
import { TaskCreate } from './features/tasks/task-create/task-create.component';
import { TaskDelete } from './features/tasks/task-delete/task-delete.component';
import { TaskUpdate } from './features/tasks/task-update/task-update.component';
import { TaskByProject } from './features/tasks/task-by-project/task-by-project.component';
import { AuthComponent } from './core/auth/auth.component';
import { MenuComponent } from './features/menu/menu.component';
import { loginGuard } from './core/auth/guards/login-guard';
import { unsavedComponentGuard } from './core/auth/guards/unsaved.component-guard';
export const routes: Routes = [
  { path: 'projects', component: ProjectListComponent, canActivate: [loginGuard] },
  { path: 'projects/create', component: ProjectCreateComponent, canActivate: [loginGuard] },
  { path: 'projects/:id', component: ProjecById, canActivate: [loginGuard] },
  { path: 'projects/update/:id', component: ProjectUpdateComponent, canActivate: [loginGuard] },
  { path: 'projects/delete/:id', component: ProjectDelete, canActivate: [loginGuard] },
  { path: 'engineers', component: EngineerList, canActivate: [loginGuard] },
  { path: 'engineers/create', component: EngineerCreate, canActivate: [loginGuard], canDeactivate: [unsavedComponentGuard] },
  { path: 'engineers/:id', component: EngineerById, canActivate: [loginGuard] },
  { path: 'engineers/update/:id', component: EngineerUpdate, canActivate: [loginGuard] },
  { path: 'engineers/delete/:id', component: EngineerDelete, canActivate: [loginGuard] },
  { path: 'tasks', component: TaskList, canActivate: [loginGuard] },
  { path: 'tasks/create', component: TaskCreate, canActivate: [loginGuard] },
  { path: 'tasks/:id', component: TaskById, canActivate: [loginGuard] },
  { path: 'tasks/update', component: TaskUpdate, canActivate: [loginGuard] },
  { path: 'tasks/delete/:id', component: TaskDelete, canActivate: [loginGuard] },
  { path: 'projects/:id/tasks', component: TaskByProject, canActivate: [loginGuard] },
  { path: '', component: AuthComponent},
  { path: 'menu', component: MenuComponent, canActivate: [loginGuard] },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];
