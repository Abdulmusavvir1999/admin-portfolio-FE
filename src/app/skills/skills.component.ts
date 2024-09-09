import { Component, inject } from '@angular/core';
import { UrlService } from '../service/url.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateSkillComponent } from '../update/update-skill/update-skill.component';
import { DeleteSkillComponent } from '../delete/delete-skill/delete-skill.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  // variable
  skillArray: any[] = []

  // injection
  urlService = inject(UrlService);
  dialog: MatDialog = inject(MatDialog);

  ngOnInit() {
    this.getSkillDetails()
  }

  //! skill
  // get skill
  getSkillDetails() {
    this.urlService.getSkillDetails().subscribe({
      next: (res: any) => {
        const response = this.urlService.decryptData({ data: res })
        this.skillArray = response;
        console.log(this.skillArray);

      },
    });
  }

  // add skill
  openAddSkillDialog() {
    const dialog = this.dialog.open(UpdateSkillComponent, {
      width: '600px',
      height: '61.5%',
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getSkillDetails();
      },
    });
  }

  // update skill
  openEditSkillDialog(task: any) {
    const dialog = this.dialog.open(UpdateSkillComponent, {
      width: '600px',
      height: '61.5%',
      data: { task },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getSkillDetails();
      },
    });
  }


  // delete skill
  openDeleteSkillDialog(id: string) {
    const dialog = this.dialog.open(DeleteSkillComponent, {
      width: '600px',
      data: { id },
    });

    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res) this.getSkillDetails();
      },
    });
  }
}
