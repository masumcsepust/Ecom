import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketTotal } from '../../models/basket';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss']
})
export class OrderTotalComponent implements OnInit {
  baskettotal$: Observable<IBasketTotal>;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.baskettotal$ = this.basketService.basketTotal$;
  }

}
