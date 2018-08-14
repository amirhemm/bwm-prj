import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rental } from './../shared/rental.model';
import { RentalService } from './../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit {
  newRental: Rental;
  rentalCategories = Rental.CATEGORIES;
  errors: any [] = [];


  constructor(private rentalService: RentalService,
              private router: Router) { }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental() {
    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rental) => {
        this.router.navigate([`/rentals/${rental._id}`]);
      }, (errorMessage: HttpErrorResponse) => {
        this.errors = errorMessage.error.errors;
      }
    );
  }

  handelImageChange() {
    this.newRental.image = 'https://www.horniman.ac.uk/media/w650h650/hornimanbutterflyhouse-interior-2.jpg';
  }

}
