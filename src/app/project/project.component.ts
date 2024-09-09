import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UrlService } from '../service/url.service';
import { UpdateProjectComponent } from '../update/update-project/update-project.component';
import { DeleteProjectComponent } from '../delete/delete-project/delete-project.component';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  // variable
  projectArray: any[] = []

  // injection
  urlService = inject(UrlService);
  dialog: MatDialog = inject(MatDialog);

  baseUrl = environment.BASEURL

  ngOnInit() {
    this.getProjectDetails()
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

  // add project
  openAddProjectDialog() {
    const dialog = this.dialog.open(UpdateProjectComponent, {
      width: '600px',
      height: '73.5%',
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getProjectDetails();
      },
    });
  }

  // update project
  openEditProjectDialog(task: any) {
    const dialog = this.dialog.open(UpdateProjectComponent, {
      width: '600px',
      height: '73.5%',
      data: {
        "project_id": task.project_id,
        "project_name": task.project_name,
        "project_description": task.project_description,
        "github_link": task.github_link,
        "website_link": task.website_link,
        "project_old_pic": task.project_pic,
      },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getProjectDetails();
      },
    });
  }

  // delete project
  openDeleteProjectDialog(id: string) {
    const dialog = this.dialog.open(DeleteProjectComponent, {
      width: '600px',
      data: { id },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getProjectDetails();
      },
    });
  }
}
