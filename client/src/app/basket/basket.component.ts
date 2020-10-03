import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
  }

  // Basket Increment
  incrementBasketItem(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  // decrement basket
  decrementBasketItem(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }

  // Remove Basket
  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

}