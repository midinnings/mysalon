import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Events, ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/Service/common.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-refferal',
  templateUrl: './refferal.page.html',
  styleUrls: ['./refferal.page.scss'],
})
export class RefferalPage implements OnInit {
  referform: FormGroup;
  item: any = {};
  RefferalCode: any;
  SalonName_Show: '';
  constructor(public events:Events,public modal: ModalController, public Fb: FormBuilder, public common: CommonService, public alertController: AlertController) {
    this.item.refervalid = false;
    this.item.message = null;
    this.item.TempSalonData = {};
    this.item.TempSalonData.name = '';
  }
  ngOnInit() {
    this.referform = this.Fb.group({
      refercode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])),
    })
  }
  close() {
    this.modal.dismiss({ Status: false });
    // this.common.PageGoto('Forward', '/tabs/dashboard');
  }

  Proceed() {
    let env = this;
    let UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    // this.modal.dismiss({ Status: true, refercode: this.referform.value.refercode});
    this.common.PostMethod("SaveReferral", { mobileno: UserProfile.mobileno, userid: localStorage.getItem("UserId"), referralcode: this.RefferalCode }).then((res: any) => {
      if (res.Status == 1) {
        localStorage.setItem('SalonReferredID', res.Data.b_id);
        localStorage.setItem('SalonReffered', JSON.stringify(res.Data));
        env.item.refervalid = true;
        //-----Updating User Profile with Referral Code-----------------------------------
        UserProfile.referralcode = env.referform.value.refercode;
        localStorage.setItem('UserProfile', JSON.stringify(UserProfile));
        env.modal.dismiss({ Status: true, refercode: env.referform.value.refercode });
      } else {

        if(this.RefferalCode.length==8){
            if(res.Data){
              res.Data['ApplyPreferredSalon_Now']=true;
              env.modal.dismiss({});
              this.common.PageGoto('Forward','salon-details',res.Data)
            }
        }
        env.item.refervalid = false;
        env.item.message = "your applied referal code not valid! Please Try Again"
      }
    }, err => {
      //  this.modal.dismiss({ Status: true, refercode: this.referform.value.refercode});
      //localStorage.setItem('SalonReffered', '{"id":"15"}');
    });
  }


  GetSalonData() {
    let UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    this.common.PostMethod("SaveReferral", {mobileno: UserProfile.mobileno, referralcode: this.RefferalCode }).then((res: any) => {

      if (res.Data) {
        this.item.refervalid = true;
        this.item.message = null;
        this.item.TempSalonData = res.Data;
        if(res.Data.name) { this.SalonName_Show = res.Data.name; } else { this.SalonName_Show = '' }
       
      } else {
        this.item.refervalid = false;
        this.item.message = "Your applied refferal code is not valid! Please check & try again";
      }

    }, err => {

    });
  }


  CheckUserAvalability() {
    //referal check api
    this.GetSalonData();
  }

  Process(){
    let env = this;
    this.GetSalonData();
    setTimeout(() => {
     if(this.item.refervalid) env.presentAlertConfirm();
    }, 1000);
    
  }

  async presentAlertConfirm() {

    let env = this;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'You are about to become loyal customer to this salon: ' + env.SalonName_Show,
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
            env.Proceed();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }


  // async MarkAsPrefered() {

  //   let env = this;
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Confirm!',
  //     message: 'You are about to become loyal customer to this salon: ' + env.SalonData.name,
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: ');
  //         }
  //       }, {
  //         text: 'Okay',
  //         handler: () => {

  //           env.CallPreferedAPI();
  //           localStorage.setItem('SalonReferredID', env.SalonData.b_id);
  //           localStorage.setItem('SalonReffered', JSON.stringify(env.SalonData));
  //           env.common.presentLoader();
  //           env.events.publish('ReloadDashboard');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }


  // CallPreferedAPI() {
  //   let UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
  //   this.common.PostMethod("SetPrefferedSalon", { mobile: UserProfile.mobileno, b_name: this.SalonData.name, code: this.SalonData.referralcode, userid: localStorage.getItem("UserId") }).then((res: any) => {
  //     console.log(res);
  //     //this.lists.Servicelist = res.Data;
  //   });
  // }


}
