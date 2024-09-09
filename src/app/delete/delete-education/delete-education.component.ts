import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UrlService } from '../../service/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-education',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-education.component.html',
  styleUrl: './delete-education.component.scss'
})
export class DeleteEducationComponent {
  // * INJECTS
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)

  constructor(public dialogRef: MatDialogRef<DeleteEducationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any = null) {
  }

  deleteEducation() {
    let details = {
      "education_id": this.data.id
    }

    this.service.deleteEducation({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('Education Deleted Successfully', 'Success', {
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
