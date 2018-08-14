import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {

  rentals: Rental[] = [];
  city: any;
  errors: any[] = [];

  constructor(private route: ActivatedRoute,
              private rentalService: RentalService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.city = params['city'];
      this.getRentalByCity();
    });
  }

  getRentalByCity() {
    this.errors = [];
    this.rentals = [];
    this.rentalService.getSearchedRentals(this.city).subscribe((rentals: Rental[]) => {
      this.rentals = rentals;
    }, (errResponse: HttpErrorResponse) => {
      this.errors = errResponse.error.errors;
    });
  }

}
