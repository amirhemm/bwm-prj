import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from './booking.model';
import { Observable } from 'rxjs';

@Injectable()
export class BookingService {

  constructor(private http: HttpClient) { }

  postBooking(booking: Booking): Observable<any> {
    return this.http.post('/api/v1/bookings', booking);
  }
}
