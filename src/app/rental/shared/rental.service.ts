import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rental } from './rental.model';

@Injectable()
export class RentalService {

  constructor(private http: HttpClient) { }

  public getRentalById(rentalId: string): Observable<any> {
    return this.http.get(`/api/v1/rentals/${rentalId}`);
  }

  public getRentals(): Observable<any> {
    return this.http.get('/api/v1/rentals');
  }

  getSearchedRentals(city): Observable<any> {
    return this.http.get(`/api/v1/rentals?city=${city}`);
  }

  createRental(rental: Rental): Observable<any> {
    return this.http.post('/api/v1/rentals', rental);
  }

  getUserRentals(): Observable<any> {
    return this.http.get('/api/v1/rentals/manage');
  }

  deleteRental(rentalId: string): Observable<any> {
    return this.http.delete(`/api/v1/rentals/${rentalId}`);
  }
}
