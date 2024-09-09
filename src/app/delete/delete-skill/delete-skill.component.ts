import { Component, Inject, inject } from '@angular/core';
import { UrlService } from '../../service/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-skill',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-skill.component.html',
  styleUrl: './delete-skill.component.scss'
})
export class DeleteSkillComponent {
  // * INJECTS
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)

  constructor(public dialogRef: MatDialogRef<DeleteSkillComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any = null) {
  }

  deleteSkill() {
    let details = {
      "skill_id": this.data.id
    }
    this.service.deleteSkill({ data: this.service.encryptData(details) }).subscribe({
      next: (res: any) => {
        this.snackbar.open('Skill Deleted Successfully', 'Success', {
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
