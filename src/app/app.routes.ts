import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "", component: AdminPanelComponent },
];
