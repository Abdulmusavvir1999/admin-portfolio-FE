import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DeleteUserComponent } from '../delete/delete-user/delete-user.component';
import { UpdateUserComponent } from '../update/update-user/update-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UrlService } from '../service/url.service';
import { UpdateUserPasswordComponent } from '../update/update-user-password/update-user-password.component';
import { data } from 'jquery';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  // variable
  userArray: any[] = []

  // injection
  urlService = inject(UrlService);
  dialog: MatDialog = inject(MatDialog);

  ngOnInit() {
    this.getUserDetails()
  }

  //! user
  // get user
  getUserDetails() {
    this.urlService.getUserDetails().subscribe({
      next: (res: any) => {
        const response = this.urlService.decryptData({ data: res })
        this.userArray = response;

      },
    });
  }

  // add user
  openAddUserDialog() {
    const dialog = this.dialog.open(UpdateUserComponent, {
      width: '600px',
      height: '60.2%',
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getUserDetails();
      },
    });
  }

  // update user
  openEditUserDialog(task: any) {
    const dialog = this.dialog.open(UpdateUserComponent, {
      width: '600px',
      height: '46.05%',
      data: { task },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getUserDetails();
      },
    });
  }

  // update password
  openEditUserPasswordDialog(id: any) {
    const dialog = this.dialog.open(UpdateUserPasswordComponent, {
      width: '600px',
      data: { id },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getUserDetails();
      },
    });
  }

  // delete user
  openDeleteUserDialog(id: string) {
    const dialog = this.dialog.open(DeleteUserComponent, {
      width: '600px',
      data: { id },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getUserDetails();
      },
    });
  }
}
