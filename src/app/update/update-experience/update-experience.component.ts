import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UrlService } from '../../service/url.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { error } from 'jquery';

@Component({
  selector: 'app-update-experience',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './update-experience.component.html',
  styleUrl: './update-experience.component.scss'
})
export class UpdateExperienceComponent {
  // * INJECTS
  fb: FormBuilder = inject(FormBuilder)
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  // * VARIABLES
  isEdit: boolean = false
  experienceForm: FormGroup = this.fb.group({
    company: [null, Validators.required],
    role: [null, Validators.required],
    year: [null, Validators.required],
    description: [null, Validators.required],
  });
  categoryType: any;

  constructor(public dialogRef: MatDialogRef<UpdateExperienceComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  addExperience() {
    let details = {
      "company": this.experienceForm.value.company,
      "role": this.experienceForm.value.role,
      "year": this.experienceForm.value.year,
      "description": this.experienceForm.value.description,
    };

    this.service.addExperience({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('Experience Added Successfully', 'Success', {
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
        this.snackbar.open('Error updating Experience', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    })
  }

  updateExperience() {
    let details = {
      "experience_id": this.data.task.experience_id,
      "company": this.experienceForm.value.company,
      "role": this.experienceForm.value.role,
      "year": this.experienceForm.value.year,
      "description": this.experienceForm.value.description,
    }


    this.service.updateExperience({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('Experience Updated Successfully', 'Success', {
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
        this.snackbar.open('Error updating Experience', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    })
  }

  addOrUpdate() {
    if (this.isEdit)
      this.updateExperience()
    else
      this.addExperience()
  }

  ngAfterViewInit() {
    if (this.data) {
      this.isEdit = true
      this.experienceForm.patchValue(this.data?.task)
      this.cdr.detectChanges()
    }
  };
}
