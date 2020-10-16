import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BasketService } from 'src/app/basket/basket.service';
import { IDelivaryMethod } from 'src/app/shared/models/delivaryMethod';
import { environment } from 'src/environments/environment';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  delivaryMethods: IDelivaryMethod[];


  constructor(private checkoutService: CheckoutService,
              private basketService: BasketService) { }

  ngOnInit() {
    this.checkoutService.getDelivaryMethods().subscribe((dm: IDelivaryMethod[]) => {
      this.delivaryMethods = dm;
    }, error => {
      console.log(error);
    });
  }

  setShippingPrice(deliveryMethod: IDelivaryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }
}
