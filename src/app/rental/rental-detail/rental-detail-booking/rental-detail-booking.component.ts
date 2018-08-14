import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { Booking } from '../../../booking/shared/booking.model';
import { BookingService } from '../../../booking/shared/booking.service';
import { HelperService } from '../../../common/service/helper.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/shared/auth.service';
import { Rental } from '../../shared/rental.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  daterange: any = {};
  bookedOutDates: any [] = [];
  errors: any[] = [];

  newBooking: Booking;
  modalRef: any;

  options: any = {
      locale: { format: Booking.DATE_FORMAT },
      alwaysShowCalendars: false,
      opens: 'left',
      autoUpdateInput: false,
      isInvalidDate: this.checkForInvalidDate.bind(this)
  };

  constructor(private helperService: HelperService,
              private modalService: NgbModal,
              private bookingService: BookingService,
              private toastr: ToastrService,
              public auth: AuthService) { }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }

  private checkForInvalidDate(date) {
    return this.bookedOutDates.includes(this.helperService.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;
    if (bookings && bookings.length > 0) {
        bookings.forEach((booking: Booking) => {
        const dateRange = this.helperService.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  private addNewBookedOutDates(bookingData: any) {
    const newDates = this.helperService.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...newDates);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  createBooking() {

    this.newBooking.rental = this.rental;
    this.bookingService.postBooking(this.newBooking).subscribe((data: any) => {
      this.addNewBookedOutDates(data);
      this.newBooking = new Booking();
      this.modalRef.close();
      this.resetDatePicker();
      this.toastr.success('Booking has been successfully created, check your booking details on the manage section!', 'Success!');
    }, (errResponse) => {
      this.errors = errResponse.error.errors;
    });
  }

  selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helperService.formatBookingDate(value.start);
    this.newBooking.endAt = this.helperService.formatBookingDate(value.end);
    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }

}
