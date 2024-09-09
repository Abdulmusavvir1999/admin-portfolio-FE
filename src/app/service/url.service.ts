import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AES } from 'crypto-js';
import * as CryptoJs from 'crypto-js';
import { environment } from '../environment/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  http: HttpClient = inject(HttpClient)

  encryptData(value: any) {
    return AES.encrypt(
      JSON.stringify(value), environment.SECRETKEY
    ).toString();
  }

  decryptData(value: any) {
    return JSON.parse(
      AES.decrypt(value.data, environment.SECRETKEY)
        .toString(CryptoJs.enc.Utf8)
    )
  }




  login(value: any): Observable<any> {
    return this.http.post<any>(`
      http://localhost:3005/portfolio/login`,
      value);
  }


  //! get about details ----------------------------------

  // Example client-side code
  getAboutDetails(): Observable<any> {


    let headers = new HttpHeaders({
      "custom-value": "some-value",

    });

    return this.http.get("http://localhost:3005/portfolio/aboutMe", { headers: headers });
  }

  // update About
  updateAbout(value: any): Observable<any> {

    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/aboutMe/update`, value, { headers: header })
  }

  //! get education details -----------------------------


  getEducationDetails(): Observable<any> {


    let header = new HttpHeaders({
      "custom-value": "some-value",
    })

    return this.http.get("http://localhost:3005/portfolio/education", { headers: header })
  }
  // add Education
  addEducation(task: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>("http://localhost:3005/portfolio/education/add", task, { headers: header })
  }

  // update education
  updateEducation(value: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/education/update`, value, { headers: header })
  }

  // delete education

  deleteEducation(id: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/education/delete`, id, { headers: header })
  }


  //! get experience details -------------------------------

  getExperienceDetails(): Observable<any> {
    return this.http.get("http://localhost:3005/portfolio/experience")
  }

  // update experience
  updateExperience(value: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/experience/update`, value, { headers: header })
  }

  // add experience
  addExperience(task: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>("http://localhost:3005/portfolio/experience/add", task, { headers: header })
  }

  // delete experience

  deleteExperience(id: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/experience/delete`, id, { headers: header })
  }


  // ! skills

  getSkillDetails(): Observable<any> {
    return this.http.get("http://localhost:3005/portfolio/skill")
  }

  // update skill
  updateSkill(value: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/skill/update`, value, { headers: header })
  }

  // add skill
  addSkill(task: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>("http://localhost:3005/portfolio/skill/add", task, { headers: header })
  }

  // delete skill

  deleteSkill(id: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/skill/delete`, id, { headers: header })
  }

  // ! project

  getProjectDetails(): Observable<any> {
    return this.http.get("http://localhost:3005/portfolio/project")
  }

  // update project
  updateProject(value: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/project/update`, value, { headers: header })
  }

  // add project
  addProject(task: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>("http://localhost:3005/portfolio/project/add", task, { headers: header })
  }

  // delete project

  deleteProject(id: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/project/delete`, id, { headers: header })
  }


  // ! user

  getUserDetails(): Observable<any> {
    return this.http.get("http://localhost:3005/portfolio/user")
  }

  // update user
  updateUser(value: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/user/update`, value, { headers: header })
  }

  // update user password
  updateUserPassword(value: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/user/update/password`, value, { headers: header })
  }

  // add user
  addUser(task: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>("http://localhost:3005/portfolio/user/add", task, { headers: header })
  }

  // delete user

  deleteUser(id: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/user/delete`, id, { headers: header })
  }


  // ! command

  // get command

  getCommandDetails(): Observable<any> {
    return this.http.get("http://localhost:3005/portfolio/command")
  }

  // delete command

  deleteCommand(id: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      "token": localStorage.getItem("token") || '',
      "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/command/delete`, id, { headers: header })
  }

  // ! logout
  logout(id: any): Observable<any> {
    let headers = new HttpHeaders({
      'my-custom-header': 'some-value'
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/logout`, id)
  }

  // ! image

  // get image

  getImageDetails(): Observable<any> {
    return this.http.get("http://localhost:3005/portfolio/image")
  }
  // get image

  addImage(formData: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
    })
    return this.http.post<{ name: string }>("http://localhost:3005/portfolio/image/upload", formData, { headers: header })
  }

  // update image hero section
  updateHeroSectionImage(value: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      // "token": localStorage.getItem("token") || '',
      // "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/update/heroSectionImageUpdate`, value, { headers: header })
  }

  // update about section
  updateAboutImage(value: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      // "token": localStorage.getItem("token") || '',
      // "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/update/aboutImageUpdate`, value, { headers: header })
  }

  // update about section
  updateResumeImage(value: any): Observable<any> {
    let header = new HttpHeaders({
      'my-custom-header': 'some-value',
      // "token": localStorage.getItem("token") || '',
      // "token_id": localStorage.getItem("userId") || ''
    })
    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/update/resumeImageUpdate`, value, { headers: header })
  }

  // update about section
  getAdminDetails(value: any): Observable<any> {

    return this.http.post<{ name: string }>(`http://localhost:3005/portfolio/gedAdminDetails`, value)
  }



  // logout
  router = inject(Router)
  snackbar = inject(MatSnackBar)

  logOut() {
    let user_id = JSON.parse(localStorage.getItem("userId")!)

    this.logout({ data: this.encryptData(user_id) }).subscribe({
      next: (res: any) => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('login');
        //snack bar message

        this.snackbar.open('Successfully Logout', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });

      }
    });
  }
}
