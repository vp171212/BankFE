import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent {
  withdrawalForm = new FormGroup({
    accountNumber: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    transactionType: new FormControl('', [Validators.required])
  });

  constructor(private deposit: TransactionService, private router: Router) {}

  // Getter method to easily access form controls
  get formControls() {
    return this.withdrawalForm.controls;
  }

  withdrawalData(data: any) {
    console.log(data);

    if (this.withdrawalForm.valid) {
      this.deposit.withdralAdd(data).subscribe({
        next: (data) => {
          alert('Amount withdrawn');
          this.router.navigateByUrl('/statement');
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
        }
      });
    } else {
      // Mark all form controls as touched to trigger error messages
      this.markAllControlsAsTouched();
      alert('Please fill in all required fields.');
    }
  }

  // Method to mark all form controls as touched
  private markAllControlsAsTouched() {
    Object.values(this.withdrawalForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
