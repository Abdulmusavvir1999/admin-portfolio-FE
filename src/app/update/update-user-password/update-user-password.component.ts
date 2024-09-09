import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UrlService } from '../../service/url.service';

@Component({
  selector: 'app-update-user-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './update-user-password.component.html',
  styleUrl: './update-user-password.component.scss'
})
export class UpdateUserPasswordComponent {
  // * INJECTS
  fb: FormBuilder = inject(FormBuilder)
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  // * VARIABLES
  isEdit: boolean = false
  userForm: FormGroup = this.fb.group({
    password: [null, Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<UpdateUserPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  updateUserPassword() {
    let details = {
      "user_id": this.data.id,
      "password": this.userForm.value.password,
    };


    this.service.updateUserPassword({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('user Password Updated Successfully', 'Success', {
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
        this.snackbar.open('Error Password updating user', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    });
  }

  ngAfterViewInit() {
    if (this.data) {
      this.isEdit = true;
      this.userForm.patchValue(this.data.task);
      this.cdr.detectChanges();
    }
  }
}
