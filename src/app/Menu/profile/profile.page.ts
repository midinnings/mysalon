import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FcmmessageService } from './../../Service/fcmmessage.service';
import { CommonService } from './../../Service/common.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect, AlertController, Events } from '@ionic/angular'; @Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  lists: any = {}
  PrefSalon: any = false;
  UserData: any = {};
  UserType:any = {};
  @ViewChild('stylistselect', { static: false }) stylistselect: IonSelect;

  constructor(public events: Events, public alertController: AlertController, public social: SocialSharing, public fcmmessage: FcmmessageService, public router: Router, public common: CommonService) {
    let env=this;
    events.subscribe('ProfileUpdated', (user) => {
      env.UserData = JSON.parse(localStorage.getItem('UserProfile'));
    });
   }

  ngOnInit() {
    this.UserType = localStorage.getItem("UserType");
    //  env.events.publish('ProfileUpdated');

   



    this.lists.language = localStorage.getItem("language") || "English";
    this.UserData = JSON.parse(localStorage.getItem('UserProfile'));
    if (localStorage.getItem('SalonReffered')) this.PrefSalon = true
  }

  logout() {
    let env = this;
    localStorage.clear();
    setTimeout(() => {
      env.fcmmessage.GetToken();
      //window.location.reload();
      env.common.PageGoto('Root', '/login');
    }, 200);
  }

  ShareApp() {
    let message = "Hello, I have started using My Salon Zone App to manage appointments, billing and much more. Check out the App Now. For Android.";
    let subject = "Download My Salon Zone App";
    let file = "";
    let url: "https://play.google.com/store/apps/details?id=com.mysalonzone";
    this.social.share(message, subject, file, url);
  }

  Openpopup() {
    this.stylistselect.open();
  }

  GotoUpdate() {
    this.common.PageGoto('Forward', 'update-profile')
  }

  ChangeLanguage() {
    let Profile = JSON.parse(localStorage.getItem("UserProfile"));
    Profile.language = this.lists.language;
    localStorage.setItem("UserProfile", JSON.stringify(Profile));
    localStorage.setItem("language", this.lists.language);
    this.common.PostMethod("UpdateData", { file: "userlogin", name: "id", value: Profile.id, updatename: "language", updatevalue: this.lists.language }).then((res: any) => {
      this.common.presentToast("Language Change Successfully", 4000);
    })
  }

  async LeaveSalon() {

    let env = this;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'You are about to leave your preferred salon and that will cause loosing loyalty points, do you still want to continue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: ');
          }
        }, {
          text: 'Okay',
          handler: () => {
            localStorage.removeItem('SalonReferredID');
            localStorage.removeItem('SalonReffered');
            env.common.presentLoader();
            let TempUserData= JSON.parse(localStorage.getItem("UserProfile"));
            TempUserData.referralcode = null;
            localStorage.setItem("UserProfile", JSON.stringify(TempUserData));
            env.LeaveSalonAPI();


          }
        }
      ]
    });

    await alert.present();
  }


  LeaveSalonAPI() {
    this.common.PostMethod("LeavePrefferedSalon", { id: localStorage.getItem('UserId') }).then((res: any) => {

      window.location.reload();
    });

  }
}
