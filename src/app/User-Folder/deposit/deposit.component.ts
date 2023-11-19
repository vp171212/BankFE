import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {
  depositForm = new FormGroup({
    accountNumber: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    transactionType: new FormControl('', [Validators.required])
  });

  constructor(private deposit: TransactionService, private router: Router) {}

  depositData(data: any) {
    console.log(data);

    if (this.depositForm.valid) {
      this.deposit.add(data).subscribe({
        next: (data) => {
          alert('Amount Deposited');
          this.router.navigateByUrl('/statement');
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
