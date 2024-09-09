import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UrlService } from '../../service/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-command',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-command.component.html',
  styleUrl: './delete-command.component.scss'
})
export class DeleteCommandComponent {
  // * INJECTS
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)

  constructor(public dialogRef: MatDialogRef<DeleteCommandComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any = null) {
  }

  deleteCommand() {
    let details = {
      "command_id": this.data.id
    }

    this.service.deleteCommand({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('Command Deleted Successfully', 'Success', {
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
