import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUpService } from '../../service/sign-up.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  token: any = '';
  myToken: any;
  role: any;
  showError = false;
  errorMessage: any;

  constructor(private auth: SignUpService, private router: Router) {}

  loginUser(formData: any) {
    if (this.loginForm.valid) {
      this.auth.login(formData).subscribe({
        next: (response) => {
          console.log(response);
          // get token value from header
          this.myToken = response.headers.get('jwt');
          // convert from json
          this.myToken = JSON.parse(this.myToken);
          console.log(this.myToken);

          this.role = response.body;
          // store it in LS
          localStorage.setItem('token', this.token.actualToken);
          if (this.role === 'Admin') {
            this.router.navigateByUrl('/adminHome');
          } else {
            this.router.navigateByUrl('/userHome');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.showError = true;
          this.errorMessage = this.getErrorMessage(err);
        }
      });
    } else {
      this.showError = true;
      this.errorMessage = 'Please provide both username and password.';
    }
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return `An error occurred: ${error.error.message}`;
    } else {
      // Server-side error
      return `Error: ${error.status} - ${error.statusText}\n${error.error.Message || 'Unknown error'}`;
    }
  }
}
