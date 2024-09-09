import { Component, inject } from '@angular/core';
import { UrlService } from '../service/url.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // variable

  educationArray: any[] = []
  experienceArray: any[] = []
  skillArray: any[] = []
  projectArray: any[] = []
  userArray: any[] = []

  // inject
  urlService = inject(UrlService);

  ngOnInit(): void {
    this.getEducationDetails()
    this.getExperienceDetails()
    this.getSkillDetails()
    this.getProjectDetails()
    this.getUserDetails()
  }


  //! education
  // get education
  getEducationDetails() {
    this.urlService.getEducationDetails().subscribe({
      next: (res: any) => {
        const response = this.urlService.decryptData({ data: res })
        this.educationArray = response;
      },
    });
  }

  //! experience
  getExperienceDetails() {
    this.urlService.getExperienceDetails().subscribe({
      next: (res: any) => {
        const response = this.urlService.decryptData({ data: res })
        this.experienceArray = response;
      },
    });
  }

  //! skill
  // get skill
  getSkillDetails() {
    this.urlService.getSkillDetails().subscribe({
      next: (res: any) => {
        const response = this.urlService.decryptData({ data: res })
        this.skillArray = response;
        console.log(this.skillArray);

      },
    });
  }

  //! project
  // get project
  getProjectDetails() {
    this.urlService.getProjectDetails().subscribe({
      next: (res: any) => {
        const response = this.urlService.decryptData({ data: res })
        this.projectArray = response;
        console.log(response);
      },
    });
  }

  //! user
  // get user
  getUserDetails() {
    this.urlService.getUserDetails().subscribe({
      next: (res: any) => {
        const response = this.urlService.decryptData({ data: res })
        this.userArray = response;

      },
    });
  }
}
