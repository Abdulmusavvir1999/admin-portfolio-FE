import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UrlService } from '../../service/url.service';

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.scss'
})
export class UpdateProjectComponent {
  // * INJECTS
  fb: FormBuilder = inject(FormBuilder)
  service = inject(UrlService)
  snackbar: MatSnackBar = inject(MatSnackBar)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  // * VARIABLES
  isEdit: boolean = false
  projectForm: FormGroup = this.fb.group({
    project_name: [null, Validators.required],
    project_description: [null, Validators.required],
    github_link: [null, Validators.required],
    website_link: [null, Validators.required],
    project_pic: [null],
  });
  categoryType: any;

  constructor(public dialogRef: MatDialogRef<UpdateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  formData!: FormData;
  image?: File;

  FileSelected(event: any) {
    const file = event.target.files[0];
    this.image = file
  }


  addProject() {

    this.formData = new FormData()
    this.formData.append('image', this.image!);
    console.log(this.image);

    this.service.addImage(this.formData).subscribe({
      next: (data: any) => {
        console.log(data.image);
        let details = {
          "project_name": this.projectForm.value.project_name,
          "project_description": this.projectForm.value.project_description,
          "github_link": this.projectForm.value.github_link,
          "website_link": this.projectForm.value.website_link,
          "project_pic": data.image,
        };

        this.service.addProject({ data: this.service.encryptData(details) }).subscribe({
          next: (res: any) => {
            this.snackbar.open('Project Added Successfully', 'Success', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
            });
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            if (err.status === 610) {
              this.dialogRef.close(true);
              this.service.logOut()
            }
            this.snackbar.open('Error adding project', 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        });
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        console.log(error)
      }
    });



  }

  updateProject() {

    if (this.projectForm.value.project_pic === null) {
      let details = {
        "project_id": this.data.project_id,
        "project_name": this.projectForm.value.project_name,
        "project_description": this.projectForm.value.project_description,
        "github_link": this.projectForm.value.github_link,
        "website_link": this.projectForm.value.website_link,
        "project_pic": this.data.project_old_pic,
      };

      this.service.updateProject({ data: this.service.encryptData(details) }).subscribe({
        next: (res: any) => {
          this.snackbar.open('project Updated Successfully', 'Success', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          if (err.status === 610) {
            this.dialogRef.close(true);
            this.service.logOut()
          }
          this.snackbar.open('Error updating project', 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      });
    }
    else {

      this.formData = new FormData()
      this.formData.append('image', this.image!);
      console.log(this.image);

      this.service.addImage(this.formData).subscribe({
        next: (data: any) => {
          let details = {
            "project_id": this.data.project_id,
            "project_name": this.projectForm.value.project_name,
            "project_description": this.projectForm.value.project_description,
            "github_link": this.projectForm.value.github_link,
            "website_link": this.projectForm.value.website_link,
            "project_pic": data.image,
          };

          this.service.updateProject({ data: this.service.encryptData(details) }).subscribe({
            next: (res: any) => {
              this.snackbar.open('project Updated Successfully', 'Success', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 3000,
              });
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              if (err.status === 610) {
                this.dialogRef.close(true);
                this.service.logOut()
              }
              this.snackbar.open('Error updating project', 'Close', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 3000,
              });
            }
          });
        }
      })
    }
  }


  addOrUpdate() {
    if (this.isEdit)
      this.updateProject()
    else
      this.addProject()
  }

  ngAfterViewInit() {
    if (this.data) {
      this.isEdit = true;
      this.projectForm.patchValue(this.data);
      this.cdr.detectChanges();
    }
  }

}
