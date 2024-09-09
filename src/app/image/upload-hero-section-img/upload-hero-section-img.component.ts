import { ChangeDetectorRef, Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UrlService } from '../../service/url.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-upload-hero-section-img',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './upload-hero-section-img.component.html',
  styleUrl: './upload-hero-section-img.component.scss'
})
export class UploadHeroSectionImgComponent {
  // * INJECTS
  fb: FormBuilder = inject(FormBuilder)
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  // * VARIABLES
  isEdit: boolean = false
  projectForm: FormGroup = this.fb.group({
    hero_section_pic: [null, Validators.required],
  });
  categoryType: any;

  constructor(public dialogRef: MatDialogRef<UploadHeroSectionImgComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  formData!: FormData;
  image?: File;

  FileSelected(event: any) {
    const file = event.target.files[0];
    this.image = file
  }


  updateProject() {
    this.formData = new FormData()
    this.formData.append('image', this.image!);
    console.log(this.image);

    this.service.addImage(this.formData).subscribe({
      next: (data: any) => {
        let details = {
          "profile_id": this.data.profile_id,
          "hero_section_pic": data.image,
        };
        this.service.updateHeroSectionImage({ data: this.service.encryptData(details) }).subscribe({
          next: (res: any) => {
            this.snackbar.open('project Updated Successfully', 'Success', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
            });
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            if (err.status === 610) {
              this.dialogRef.close(true);
              this.service.logOut()
            }
            this.snackbar.open('Error updating project', 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        });
      }
    });
  }



  // ngAfterViewInit() {
  //   if (this.data) {
  //     this.isEdit = true
  //     this.projectForm.patchValue(this.data)
  //     this.cdr.detectChanges()
  //   }
  // };
}
