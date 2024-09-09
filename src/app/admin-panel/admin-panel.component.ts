import { Component, inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CommonModule, JsonPipe, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { EducationExperienceComponent } from '../education-experience/education-experience.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectComponent } from '../project/project.component';
import { UsersComponent } from '../users/users.component';
import { CommandComponent } from '../command/command.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UrlService } from '../service/url.service';
import { environment } from '../environment/environment';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, AboutComponent, EducationExperienceComponent, SkillsComponent, ProjectComponent, UsersComponent, CommandComponent, DashboardComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

  // variable
  token: any;
  user_id: any;
  aboutArray: any[] = [];
  userArray: any[] = [];
  // inject
  router = inject(Router)
  matSnackBar = inject(MatSnackBar)
  urlService = inject(UrlService)

  baseUrl = environment.BASEURL

  // ngOnInit

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem("token")!)
    this.user_id = JSON.parse(localStorage.getItem("userId")!)

    this.getAboutDetails()
    this.getUserDetails()
  }

  page: string = 'dashboard'; // Default page
  dashboard: any
  about: any
  quality: any
  skills: any
  project: any
  users: any
  command: any

  // Method to change the page view
  changePage(pageName: string) {
    this.page = pageName;
  }


  getAboutDetails() {
    this.urlService.getAboutDetails().subscribe({
      next: (res: any) => {
        const response = this.urlService.decryptData({ data: res })
        this.aboutArray = response;
      },
    });
  }

  logOut() {
    let user_id = JSON.parse(localStorage.getItem("userId")!)

    this.urlService.logout({ data: this.urlService.encryptData(user_id) }).subscribe({
      next: (res: any) => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('login');
        //snack bar message

        this.matSnackBar.open('Successfully Logout', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });

      }
    })


  }

  pages() {
    switch (this.page) {
      case 'about':
        break;
      case 'quality':
        break;
      case 'skills':
        break;
      case 'project':
        break;
      case 'users':
        break;
      default:
        break;
    }
  }


  //! user
  // get user
  getUserDetails() {

    let details = {
      "user_id": this.user_id
    }
    this.urlService.getAdminDetails({ data: this.urlService.encryptData(details) }).subscribe({
      next: (res: any) => {
        console.log(res);
        const response = this.urlService.decryptData({ data: res })
        this.userArray = response;
        console.log(this.userArray);

      },
    });
  }

}
