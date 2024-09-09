import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UrlService } from '../service/url.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // variable
  token: any;

  // inject
  router = inject(Router);
  service = inject(UrlService);
  snackbar: MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem("token")!)
  }

  login(email: string, password: string) {
    let details = {
      "email": email,
      "password": password
    }

    this.service.login({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        const response = this.service.decryptData({ data: res })


        const token = response.token;
        const userId = response.user_id;
        const role = response.roles;


        // token
        localStorage.setItem('token', JSON.stringify(token));
        // userId
        localStorage.setItem('userId', JSON.stringify(userId));
        // role
        localStorage.setItem('role', JSON.stringify(role));

        this.snackbar.open('Login successfully', 'success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.router.navigateByUrl('');
      },
      error: (error: any) => {
        console.error('Login error:', error);
        if (error.status === 401) {
          this.snackbar.open('Invalid email or password', 'Error', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        } else {
          this.snackbar.open('Login error', 'Error', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      },
    });
  }
}
