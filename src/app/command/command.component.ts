import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UrlService } from '../service/url.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCommandComponent } from '../delete/delete-command/delete-command.component';

@Component({
  selector: 'app-command',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './command.component.html',
  styleUrl: './command.component.scss'
})
export class CommandComponent {
  // variable
  commandArray: any[] = []

  // injection
  urlService = inject(UrlService);
  dialog: MatDialog = inject(MatDialog);

  ngOnInit() {
    this.getCommandDetails()
  }

  //! command
  // get command
  getCommandDetails() {
    this.urlService.getCommandDetails().subscribe({
      next: (res: any) => {
        const response = this.urlService.decryptData({ data: res })
        this.commandArray = response;
      },
    });
  }

  // delete command
  openDeleteCommandDialog(id: string) {
    const dialog = this.dialog.open(DeleteCommandComponent, {
      width: '600px',
      data: { id },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getCommandDetails();
      },
    });
  }
}
