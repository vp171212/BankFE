import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
  customerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    roleId: new FormControl('', [Validators.required]),
  });

  constructor(private cstmr: CustomerService, private router: Router) {}

  customerData(data: any) {
    if (this.customerForm.valid) {
      console.log(data);
      this.cstmr.add(data).subscribe({
        next: (responseData: any) => {
          console.log(responseData);
          const customerId = (responseData as any).customerId; // Type assertion
          alert(`Customer ID: ${customerId}`);
          this.router.navigateByUrl("/thankyou");
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
        }
      });
    } else {
      // Show a message or handle invalid form
      alert('Please fill in all required fields.');
    }
  }
}
