import { CommonService } from './../../Service/common.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-checkoutreceipt',
  templateUrl: './checkoutreceipt.page.html',
  styleUrls: ['./checkoutreceipt.page.scss'],
})
export class CheckoutreceiptPage implements OnInit {
  lists: any = {};
  totalamount: any = 0;
  ShowCheckout: boolean = true;
  Ratings: any = {};
  DiscountCost = 0;
  CouponApplied = 'NA';
  AppointmentPay:any = 0;
  hideDiscount:boolean = false;
  constructor(public common: CommonService, public modal: ModalController, public navParams: NavParams) { }

  ngOnInit() {
    this.common.presentLoader();
    let env = this;
    this.lists = this.navParams.data;
    console.log(this.navParams.data);
    this.lists.UserProfile = JSON.parse(localStorage.getItem("SalonData"));
    this.lists.MyProfile = JSON.parse(localStorage.getItem("UserProfile"));
    this.lists.appointment = JSON.parse(localStorage.getItem('AppointmentData'));
    if(this.lists.appointment.coupon_applied && this.lists.appointment.coupon_applied!='')
    {this.CouponApplied =  this.lists.appointment.coupon_applied}
    this.AppointmentPay = this.lists.appointment.cost;

    var ServicesIDS = this.lists.appointment.service;
    if (ServicesIDS) {
      ServicesIDS = JSON.parse(ServicesIDS);
      ServicesIDS = ServicesIDS.toString();
    }

    this.common.PostMethod("GetServicesBYId", { id: ServicesIDS, userid: this.lists.UserProfile.b_id }).then((res: any) => {
      this.lists.serviceinfo = res.Data;
      setTimeout(() => {
        env.lists.Discount = 0;
        env.Get_Total_Amount();
      }, 500);
    });
  }

  next() {
    if (this.ShowCheckout) this.ShowCheckout = false;
  }

  close() {
    this.modal.dismiss({ Status: false })
  }

  End() {
    this.Ratings.b_id = this.lists.UserProfile.b_id;
    this.Ratings.user_id = this.lists.MyProfile.id;
    this.common.PostMethod("Salonrating", this.Ratings).then((res: any) => {
      this.lists.serviceinfo = res.Data;
    });
    this.modal.dismiss({ Status: true, totalamount: this.totalamount });
  }

  Get_Total_Amount() {
    let total: any = 0;
    this.lists.serviceinfo.forEach(element => {
      total = parseInt(total) + parseInt(element.serviceprice);
    });
    this.totalamount = parseInt(total);
    if (this.lists.DiscountType == 'Percent') {
      total = parseInt(total) - ((parseInt(this.lists.Discount) * 100) / 100);
    } else {
      total = parseInt(total) - parseInt(this.lists.Discount);
    }
    this.GetCouponData(this.lists.appointment.coupon_id);
    //Apply Discount Values--------------------------------------------------------
    if(this.lists.appointment.cost){
        this.DiscountCost = parseInt(this.totalamount) - parseInt(this.lists.appointment.cost);
        //this.totalamount = this.lists.appointment.cost;
    }
  }

  GetCouponData(ID){
    this.common.PostMethod("OfferbyId", { id: ID }).then((res: any) => {
      let Data = res.Data;
      if(Data.type != 'OnService' || Data.type != 'Flat'){
          this.hideDiscount = true;
      }
    });
  }

  logRating(Event, Type) {
    this.Ratings[Type] = Event;
    console.log(this.Ratings);
  }

}
