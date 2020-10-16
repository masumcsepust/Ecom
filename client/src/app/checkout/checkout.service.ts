import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDelivaryMethod } from '../shared/models/delivaryMethod';
import { IOrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  createOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + 'orders', order);
  }

  getDelivaryMethods() {
    return this.http.get(this.baseUrl + 'orders/deliveryMethod').pipe(
      map((dm: IDelivaryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }

}
