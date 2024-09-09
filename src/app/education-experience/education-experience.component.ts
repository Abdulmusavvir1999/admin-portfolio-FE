import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UrlService } from '../service/url.service';
import { CommonModule } from '@angular/common';
import { UpdateEducationComponent } from '../update/update-education/update-education.component';
import { UpdateExperienceComponent } from '../update/update-experience/update-experience.component';
import { DeleteEducationComponent } from '../delete/delete-education/delete-education.component';
import { DeleteExperienceComponent } from '../delete/delete-experience/delete-experience.component';

@Component({
  selector: 'app-education-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education-experience.component.html',
  styleUrl: './education-experience.component.scss'
})
export class EducationExperienceComponent {
  // variable
  educationArray: any[] = []
  experienceArray: any[] = []

  // injection
  urlService = inject(UrlService);
  dialog: MatDialog = inject(MatDialog);

  ngOnInit() {
    this.getEducationDetails()
    this.getExperienceDetails()
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

  // add education
  openAddEducationDialog() {
    const dialog = this.dialog.open(UpdateEducationComponent, {
      width: '600px',
      height: '73.5%',
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getEducationDetails();
      },
    });
  }

  // update education
  openEditEducationDialog(task: any) {
    const dialog = this.dialog.open(UpdateEducationComponent, {
      width: '600px',
      height: '73.5%',
      data: { task },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getEducationDetails();
      },
    });
  }

  // delete education
  openDeleteEducationDialog(id: string) {
    const dialog = this.dialog.open(DeleteEducationComponent, {
      width: '600px',
      data: { id },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getEducationDetails();
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

  // add experience
  openAddExperienceDialog() {
    const dialog = this.dialog.open(UpdateExperienceComponent, {
      width: '600px',
      height: '73.5%',
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getExperienceDetails();
      },
    });
  }

  // update experience
  openEditExperienceDialog(task: any) {
    const dialog = this.dialog.open(UpdateExperienceComponent, {
      width: '600px',
      height: '73.5%',
      data: { task },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getExperienceDetails();
      },
    });
  }

  // delete experience
  openDeleteExperienceDialog(id: string) {
    const dialog = this.dialog.open(DeleteExperienceComponent, {
      width: '600px',
      data: { id },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getExperienceDetails();
      },
    });
  }
}
