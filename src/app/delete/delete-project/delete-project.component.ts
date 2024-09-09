import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UrlService } from '../../service/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-project',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-project.component.html',
  styleUrl: './delete-project.component.scss'
})
export class DeleteProjectComponent {
  // * INJECTS
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)

  constructor(public dialogRef: MatDialogRef<DeleteProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any = null) {
  }

  deleteProject() {
    let details = {
      "project_id": this.data.id
    }
    this.service.deleteProject({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('Project Deleted Successfully', 'Success', {
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
