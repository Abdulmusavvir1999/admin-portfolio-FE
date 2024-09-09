import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UpdateProfileComponent } from './update/update-profile/update-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UpdateProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin';
}
