import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule, PaginationModule} from 'ngx-bootstrap';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderTotalComponent } from './components/order-total/order-total.component';



@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalComponent
  ]
})
export class SharedModule { }
