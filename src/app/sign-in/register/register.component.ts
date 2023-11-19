import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../service/register.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedDataService } from '../../service/AccountReqst.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: RegisterService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      customerId: ['', [Validators.required]]
    });
  }

  registerUser() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      console.log(data);

      this.auth.add(data).subscribe({
        next: (responseData: any) => {
          alert('New User Is Added');
          this.router.navigateByUrl('/userHome');
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
        }
      });
    } else {
      alert('Please fill in all required fields with valid values.');
    }
  }
}
