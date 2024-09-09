import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UrlService } from '../../service/url.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {
  // * INJECTS
  fb: FormBuilder = inject(FormBuilder)
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  // * VARIABLES
  isEdit: boolean = false
  profileForm: FormGroup = this.fb.group({
    name: [null, Validators.required],
    phone: [null, Validators.required],
    address: [null, Validators.required],
    birthday: [null, Validators.required],
    experience: [null, Validators.required],
    email: [null, Validators.required],
    freelance: [null, Validators.required],
    instagram_link: [null, Validators.required],
    x_link: [null, Validators.required],
    linkedin_link: [null, Validators.required],
    facebook_link: [null, Validators.required],
  });
  categoryType: any;

  constructor(public dialogRef: MatDialogRef<UpdateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  formData!: FormData
  image?: File;

  FileSelected(event: any) {
    const file = event.target.files[0];
    this.image = file
  }

  // send the data to skill file
  CreateTechnicalSkill(): void {
    this.formData = new FormData()
    this.formData.append('skill-image', this.image!);
    console.log(this.image);
  }

  updateAbout() {
    let details = {
      "profile_id": this.data.task.profile_id,
      "name": this.profileForm.value.name,
      "phone": this.profileForm.value.phone,
      "address": this.profileForm.value.address,
      "birthday": this.profileForm.value.birthday,
      "experience": this.profileForm.value.experience,
      "email": this.profileForm.value.email,
      "freelance": this.profileForm.value.freelance,
      "instagram_link": this.profileForm.value.instagram_link,
      "x_link": this.profileForm.value.x_link,
      "linkedin_link": this.profileForm.value.linkedin_link,
      "facebook_link": this.profileForm.value.facebook_link,
    }

    this.service.updateAbout({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('Profile Updated Successfully', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.dialogRef.close(true)
      },
      error: (err: any) => {
        if (err.status === 610) {
          this.dialogRef.close(true);
          this.service.logOut()
        }
      }

    })

  };

  updateImage() {
    let details = {
      "hero_section_pic": this.profileForm.value.hero_section_pic,
    }

    this.service.updateAbout(details).subscribe({
      next: (res: any) => {
        this.snackbar.open('Profile Updated Successfully', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.dialogRef.close(true)
      },
      error: (err: any) => {
        if (err.status === 610) {
          this.dialogRef.close(true);
          this.service.logOut()
        }
      }
    })
  }

  ngAfterViewInit() {
    if (this.data) {
      this.isEdit = true
      this.profileForm.patchValue(this.data?.task)
      this.cdr.detectChanges()
    }
  };


}
