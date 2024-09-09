import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UrlService } from '../../service/url.service';

@Component({
  selector: 'app-update-skill',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './update-skill.component.html',
  styleUrl: './update-skill.component.scss'
})
export class UpdateSkillComponent {
  // * INJECTS
  fb: FormBuilder = inject(FormBuilder)
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  // * VARIABLES
  isEdit: boolean = false
  skillForm: FormGroup = this.fb.group({
    skillName: [null, Validators.required],
    category: [null, Validators.required],
    description: [null, Validators.required],
  });
  categoryType: any;

  constructor(public dialogRef: MatDialogRef<UpdateSkillComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  addSkill(): void {
    const details = {
      skillName: this.skillForm.value.skillName,
      category: this.skillForm.value.category,
      description: this.skillForm.value.description,
    };

    const encryptedDetails = this.service.encryptData(details);

    this.service.addSkill({ data: encryptedDetails }).subscribe({
      next: (res: any) => {
        this.snackbar.open('Skill Added Successfully', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.dialogRef.close(true); // Close the dialog and notify parent component
      },
      error: (err) => {
        if (err.status === 610) {
          this.dialogRef.close(true);
          this.service.logOut()
        }
        this.snackbar.open('Failed to Add Skill', 'Error', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    });
  }


  updateSkill() {
    let details = {
      "skill_id": this.data.task.skill_id,
      "skillName": this.skillForm.value.skillName,
      "category": this.skillForm.value.category,
      "description": this.skillForm.value.description,
    }

    this.service.updateSkill({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('skill Updated Successfully', 'Success', {
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
        this.snackbar.open('Error updating Skill', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    })
  }

  ngAfterViewInit() {
    if (this.data) {
      this.isEdit = true
      this.skillForm.patchValue(this.data?.task)
      this.cdr.detectChanges()
    }
  };
}
