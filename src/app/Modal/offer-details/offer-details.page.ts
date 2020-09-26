import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.page.html',
  styleUrls: ['./offer-details.page.scss'],
})
export class OfferDetailsPage implements OnInit {

  public OfferDetailData:any = {};

  constructor(public modal: PopoverController, public navparams: NavParams,) { }

  ngOnInit() {
    this.OfferDetailData = this.navparams.data.data;
  }

  Close(){
    this.modal.dismiss();
  }

}
