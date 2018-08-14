import { Component, OnInit } from '@angular/core';
import { RentalService } from './../../rental/shared/rental.service';
import { Rental } from './../../rental/shared/rental.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

  userRentals: Rental [];
  rentalDeleteIndex: number;

  constructor(private rentalService: RentalService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.rentalService.getUserRentals().subscribe(
      (rentals) => {
        this.userRentals = rentals;
    }, (errMessages: HttpErrorResponse) => {
      const err = errMessages.error.errors[0].detail;
      this.toastr.error(err, 'Failed!');
    });
  }

  deleteRental(rentalId: string) {
    this.rentalService.deleteRental(rentalId).subscribe(
      (deletedRental) => {
        this.userRentals.splice(this.rentalDeleteIndex, 1);
        this.rentalDeleteIndex = undefined;
        console.log(deletedRental);
    }, (errMessages) => {
      console.log(errMessages);
      this.toastr.error(errMessages.error.errors[0].detail, 'Failed!');
    });
  }

}
