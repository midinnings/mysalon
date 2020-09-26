import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx'
import { CommonService } from 'src/app/Service/common.service';
import { ModalController } from '@ionic/angular';
import { InviteFriendsPage } from 'src/app/Modal/invite-friends/invite-friends.page';
import { PointsHistoryPage } from 'src/app/Modal/points-history/points-history.page';
@Component({
  selector: 'app-checkout',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class CheckoutPage implements OnInit {
  eventSource = [];
  calendar = {
    locale: 'en-GB',
    mode: 'month',
    currentDate: new Date(),
  };
  item: any = {};
  UserData: any = {};
  SalonData: any = {};
  Loyalty_Points: any = 0;
  SalonLogo: any;
  inviteFriends:boolean = false;

  constructor(public modal: ModalController, public social: SocialSharing, public common: CommonService, public Modal: ModalController) {
    this.item.wallet = {
      current_amt: 0,
      wanted_amt: 200.00,
      expenses_amt: 300.00,
      total_amt: 500.00
    }
    this.item.segment = 'refer';
    this.UserData = JSON.parse(localStorage.getItem('UserProfile'));
    this.SalonData = JSON.parse(localStorage.getItem('SalonData'));

  }
  ShareApp() {
    let env = this;
    let message = "Hello, I have started using My Salon Zone App to manage appointments, billing and much more. Check out the App Now.";
    let subject = "Download My Salon Zone App";
    let file = "";
    let url: "https://play.google.com/store/apps/details?id=com.mysalonzone";
    this.social.share(message, subject, file, url).then(() => {
      env.SaveRefferal();
    }).catch(() => { });
  }



  async OpenInvite() {
    const modal = await this.Modal.create({
      component: InviteFriendsPage,
      componentProps: {

      }
    });
    await modal.present();
    modal.onWillDismiss().then((result: any) => {

    });
  }

  SaveRefferal() {

    let DataSend = {
      code: this.UserData.referralcode + '' + this.UserData.id,
      b_id: this.SalonData.b_id,
      userid: this.UserData.id,
    }

    this.common.PostMethod("ReferUsers", DataSend).then((res: any) => {



    }, err => {

    });
  }


  GetUserLatestProfile() {

    this.common.PostMethod("GetProfile", { Id: this.UserData.id }).then((res: any) => {
      let DataUser = res.Data;
      this.item.wallet.current_amt = this.Loyalty_Points = DataUser.loyalty_points;

    }, err => {

    });

  }


  ngOnInit() {
    this.GetUserLatestProfile();
    let SalonData: any = localStorage.getItem('SalonReffered');
    if (SalonData) {
      SalonData = JSON.parse(SalonData);
      if (SalonData.logo) {
        this.SalonLogo = SalonData.logo;
      }
    }

    let RefSalon = localStorage.getItem('SalonReffered');
    if(RefSalon) this.inviteFriends = true;
  }

  segmentChange(ev) {
    this.item.segment = ev.detail.value;
    console.log(this.item.segment);
  }


  async OpenHistory() {
    const custmodal = await this.modal.create({
      component: PointsHistoryPage,
      cssClass: 'checkoutreceipt',
      showBackdrop: true,
      componentProps: {}
    });
    await custmodal.present();
    let { data } = await custmodal.onWillDismiss();
    if (data.Status) {

    }

  }

}
