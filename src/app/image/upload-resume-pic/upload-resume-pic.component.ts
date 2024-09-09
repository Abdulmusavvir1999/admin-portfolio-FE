import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UrlService } from '../../service/url.service';

@Component({
  selector: 'app-upload-resume-pic',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './upload-resume-pic.component.html',
  styleUrl: './upload-resume-pic.component.scss'
})
export class UploadResumePicComponent {
  // * INJECTS
  fb: FormBuilder = inject(FormBuilder)
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  // * VARIABLES
  isEdit: boolean = false
  profileForm: FormGroup = this.fb.group({
    resume_pic: [null, Validators.required],
  });
  categoryType: any;

  constructor(public dialogRef: MatDialogRef<UploadResumePicComponent>,
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
          "resume_pic": data.image,
        };
        console.log(details);

        this.service.updateResumeImage({ data: this.service.encryptData(details) }).subscribe({
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
  //     this.profileForm.patchValue(this.data?.task)
  //     this.cdr.detectChanges()
  //   }
  // };
}
