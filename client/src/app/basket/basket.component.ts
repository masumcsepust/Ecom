import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotal } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  basketTotals$: Observable<IBasketTotal>;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  // Basket Increment
  incrementBasketQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  // decrement basket
  decrementBasketQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }

  // Remove Basket
  removeBasketQuantity(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

}
