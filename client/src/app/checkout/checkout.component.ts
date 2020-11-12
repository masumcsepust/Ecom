import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { IBasketTotal } from '../shared/models/basket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  basketTotals$: Observable<IBasketTotal>;
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private basketService: BasketService) { }

  ngOnInit() {
    this.createCheckouForm();
    this.getAddressFormValues();
    this.basketTotals$ = this.basketService.basketTotal$;
    this.getDeliveryMethodValue();
  }

  createCheckouForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
       firstName: [null, Validators.required],
       lastName: [null, Validators.required],
       street: [null, Validators.required],
       city: [null, Validators.required],
       state: [null, Validators.required],
       zipCode: [null, Validators.required],
    }),

    delivaryForm: this.fb.group({
      delivaryMethod: [null, Validators.required],
    }),

    paymentForm: this.fb.group({
      nameOnCard: [null, Validators.required],
    })
    });
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe(address => {
      if (address) {
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    }, error => {
      console.log(error);
    });
  }

  getDeliveryMethodValue() {
    const basket = this.basketService.getCurrentBasketValue();

    if ( basket.deliveryMethodId !== null ) {
      this.checkoutForm.get('delivaryForm').get('delivaryMethod').patchValue(basket.deliveryMethodId.toString());
    }
  }
}
