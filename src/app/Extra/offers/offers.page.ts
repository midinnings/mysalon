import { DatePipe } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { UserPipe } from './../../Pipes/pipe/user.pipe';
import { CommonService } from './../../Service/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  constructor(public common: CommonService, public social: SocialSharing) { }
  lists: any = {};
  ngOnInit() {
    // this.GetMyOffers();
  }
  ionViewWillEnter() {
    this.GetMyOffers();
  }

  GetMyOffers() {
    this.common.PostMethod("GetOffers", { b_id: new UserPipe().transform('b_id'), userid: localStorage.getItem("UserId"), usertype: new UserPipe().transform('usertype') }).then((res: any) => {
      console.log(res);
      this.lists.Myoffers = res.Data;
    });
  }


  ShareCoupon(ev) {
    let Message = `${ev.title} \n Coupon Code:${ev.couponcode} \n Valid Till Date:${new DatePipe('en-GB').transform(ev.enddate)}\n Discount:${ev.discounttype == 'A' ? ev.discount + '<i class="fa fa-inr"></i>' : ev.discount + '%'} \n ${ev.description}\n Via-My Salon Zone App`
    console.log(Message);
    this.social.share(Message, 'My Salon Zone Coupon', [], '');
  }

  NotifiyMe() {
    this.common.PostMethod("NotifyMe", { b_id: new UserPipe().transform('b_id'), userid: localStorage.getItem("UserId"), type: 'Coupon' }).then((res: any) => {
      this.common.presentToast(res.Message, 4000);
    });
  }

  AddCoupon() {
    this.common.PageGoto('Forward', 'offers/offerndeal');
  }
}
