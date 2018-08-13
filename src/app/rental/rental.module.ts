import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '../../../node_modules/@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MapModule } from './../common/map/map.module';


import { UppercasePipe } from '../common/pipes/uppercase.pipe';
import { AuthGuard } from './../auth/shared/auth.guard';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';

import { BookingService } from './../booking/shared/booking.service';
import { RentalService } from './shared/rental.service';
import { HelperService } from '../common/service/helper.service';


const routes: Routes = [
  { path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent},
      { path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard]},
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    NgPipesModule,
    MapModule,
    Daterangepicker
  ],
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    RentalDetailBookingComponent,
    UppercasePipe
  ],
  providers: [RentalService, HelperService, BookingService]
})
export class RentalModule { }
