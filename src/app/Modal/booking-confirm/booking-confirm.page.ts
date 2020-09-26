import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.page.html',
  styleUrls: ['./booking-confirm.page.scss'],
})
export class BookingConfirmPage implements OnInit {
  lists: any={};
  amount: any={};

  constructor(public modal: ModalController, public navparams: NavParams) { }

  ngOnInit() {
    this.lists = this.navparams.data.appointmentdetails;
    this.amount=this.navparams.data.amount;
  }
  close() {
    this.modal.dismiss({ status: false });
  }
  Save() {
    this.modal.dismiss({ status: true})
  }
}
