import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UrlService } from '../../service/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  // * INJECTS
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any = null) {
  }

  deleteUsers() {
    let details = {
      "user_id": this.data.id
    }
    this.service.deleteUser({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('user Deleted Successfully', 'Success', {
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
}
