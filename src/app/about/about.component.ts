import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileComponent } from '../update/update-profile/update-profile.component';
import { UrlService } from '../service/url.service';
import { CommonModule } from '@angular/common';
import { UploadHeroSectionImgComponent } from '../image/upload-hero-section-img/upload-hero-section-img.component';
import { UploadAboutPicComponent } from '../image/upload-about-pic/upload-about-pic.component';
import { UploadResumePicComponent } from '../image/upload-resume-pic/upload-resume-pic.component';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  // variable
  aboutArray: any[] = []
  token: any;
  imageArray: any[] = []

  // injection
  urlService = inject(UrlService);
  dialog: MatDialog = inject(MatDialog);

  baseUrl = environment.BASEURL

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem("token")!)
    this.getAboutDetails()
    // this.getImageDetails()
  }

  getAboutDetails() {
    this.urlService.getAboutDetails().subscribe({
      next: (res: any) => {

        const response = this.urlService.decryptData({ data: res })
        this.aboutArray = response;
        console.log(this.aboutArray);
      },
    });
  }



  getImageDetails() {
    this.urlService.getImageDetails().subscribe({
      next: (res: any) => {
        const response = res
        this.aboutArray = response;
        // console.log(res);
      },
    });
  }


  openEditTaskDialog(task: any) {
    const dialog = this.dialog.open(UpdateProfileComponent, {
      width: '600px',
      height: '95%',
      data: { task },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getAboutDetails();
      },
    });
  }


  // image - hero section
  openEditHeroImageDialog(task: any) {
    const dialog = this.dialog.open(UploadHeroSectionImgComponent, {
      width: '600px',
      data: {
        "profile_id": task.profile_id,
        "hero_section_pic_old": task.hero_section_pic,
      },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getAboutDetails();
      },
    });
  }

  // image - about section
  openEditAboutImageDialog(task: any) {
    const dialog = this.dialog.open(UploadAboutPicComponent, {
      width: '600px',
      data: {
        "profile_id": task.profile_id,
        "about_me_pic_old": task.about_me_pic,
      },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getAboutDetails();
      },
    });
  }

  // image - resume section
  openEditResumeImageDialog(task: any) {
    const dialog = this.dialog.open(UploadResumePicComponent, {
      width: '600px',
      data: {
        "profile_id": task.profile_id,
        "resume_pic_old": task.resume_pic,
      },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getAboutDetails();
      },
    });
  }
}
