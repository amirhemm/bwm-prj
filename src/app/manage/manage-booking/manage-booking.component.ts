import { Component, OnInit } from '@angular/core';
import { BookingService } from './../../booking/shared/booking.service';
import { Booking } from './../../booking/shared/booking.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  userBookings: Booking [];
  errors: any [] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getUserBookings().subscribe(
      (bookings) => {
        this.userBookings = bookings;
        console.log(bookings);
    }, (errMessages: HttpErrorResponse) => {
      this.errors = errMessages.error.errors;
    });
  }
}
