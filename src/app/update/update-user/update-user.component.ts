import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UrlService } from '../../service/url.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  // * INJECTS
  fb: FormBuilder = inject(FormBuilder)
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)
  dialog: MatDialog = inject(MatDialog);


  // * VARIABLES
  isEdit: boolean = false
  userForm: FormGroup = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
    about: [null],
    education_experience: [null],
    skills: [null],
    project: [null],
    users: [null],
    command: [null],
  });
  categoryType: any;

  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  addUser() {
    let details = {
      "email": this.userForm.value.email,
      "password": this.userForm.value.password,
      "role": "Admin",
      "about": this.userForm.value.about,
      "education_experience": this.userForm.value.education_experience,
      "skills": this.userForm.value.skills,
      "project": this.userForm.value.project,
      "users": this.userForm.value.users,
      "command": this.userForm.value.command,
    };

    console.log(details);


    this.service.addUser({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('User Added Successfully', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        this.snackbar.open('Error adding user', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        if (err.status === 610) {
          this.dialogRef.close(true);
          this.service.logOut()
        }

      }
    });
  }

  updateUser() {
    let details = {
      "user_id": this.data.task.user_id,
      "email": this.userForm.value.email,
      "role": "Admin",
      "about": this.userForm.value.about,
      "education_experience": this.userForm.value.education_experience,
      "skills": this.userForm.value.skills,
      "project": this.userForm.value.project,
      "users": this.userForm.value.users,
      "command": this.userForm.value.command,
    };
    this.service.updateUser({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('user Updated Successfully', 'Success', {
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
        this.snackbar.open('Error updating user', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    });
  }



  addOrUpdate() {
    if (this.isEdit)
      this.updateUser()
    else
      this.addUser()
  }

  ngAfterViewInit() {
    if (this.data) {
      this.isEdit = true;
      this.userForm.patchValue(this.data.task);
      this.cdr.detectChanges();
    }
  }

}
