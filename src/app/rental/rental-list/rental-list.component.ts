import { Rental } from './../shared/rental.model';
import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  rentals: Rental[] = [];
  constructor(private retnalService: RentalService) {
  }

  ngOnInit() {
    const retnalObservable = this.retnalService.getRentals();

    retnalObservable.subscribe(
      (rentals: Rental[]) => {


        this.rentals = rentals;
      },
      (error) => {


      },
      () => {

      }
    );
  }

}
