import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UrlService } from '../../service/url.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './update-education.component.html',
  styleUrl: './update-education.component.scss'
})
export class UpdateEducationComponent {
  // * INJECTS
  fb: FormBuilder = inject(FormBuilder)
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  // * VARIABLES
  isEdit: boolean = false
  educationForm: FormGroup = this.fb.group({
    degree: [null, Validators.required],
    university: [null, Validators.required],
    year: [null, Validators.required],
    description: [null, Validators.required]
  });
  categoryType: any;

  constructor(public dialogRef: MatDialogRef<UpdateEducationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  addEducation() {
    let details = {
      "degree": this.educationForm.value.degree,
      "university": this.educationForm.value.university,
      "year": this.educationForm.value.year,
      "description": this.educationForm.value.description,
    };

    this.service.addEducation({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('Education Added Successfully', 'Success', {
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
        console.error(err);
        this.snackbar.open('Error adding education', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });

      }
    });
  }

  updateEducation() {
    let details = {
      "education_id": this.data.task.education_id,
      "degree": this.educationForm.value.degree,
      "university": this.educationForm.value.university,
      "year": this.educationForm.value.year,
      "description": this.educationForm.value.description,
    };

    this.service.updateEducation({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('education Updated Successfully', 'Success', {
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
        this.snackbar.open('Error updating education', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    });
  }


  addOrUpdate() {
    if (this.isEdit)
      this.updateEducation()
    else
      this.addEducation()
  }

  ngAfterViewInit() {
    if (this.data) {
      this.isEdit = true;
      this.educationForm.patchValue(this.data.task);
      this.cdr.detectChanges();
    }
  }

}
