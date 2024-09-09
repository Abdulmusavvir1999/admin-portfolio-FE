import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UrlService } from '../../service/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-experience',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-experience.component.html',
  styleUrl: './delete-experience.component.scss'
})
export class DeleteExperienceComponent {
  // * INJECTS
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)

  constructor(public dialogRef: MatDialogRef<DeleteExperienceComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any = null) {
  }

  deleteExperience() {
    let details = {
      "experience_id": this.data.id
    }

    this.service.deleteExperience({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('Experience Deleted Successfully', 'Success', {
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
