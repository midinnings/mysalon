import { Component, OnInit, ViewChild } from '@angular/core';
import { Contacts } from '@ionic-native/contacts/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
//import { SMS } from '@ionic-native/sms/ngx';
import { ModalController, } from '@ionic/angular';
import { CommonService } from 'src/app/Service/common.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.page.html',
  styleUrls: ['./invite-friends.page.scss'],
})
export class InviteFriendsPage implements OnInit {

  MyContacts: any = [];
  InviteContacts = [];
  UserData: any = {};
  SalonData: any = {};
  slices: number = 10;
  ReferalInviteCode='';
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  constructor(public common: CommonService, public modal: ModalController, private contacts: Contacts, public androidPermissions: AndroidPermissions) { }

  ngOnInit() {
    this.checkSMSPermission();
    let env = this;
    this.common.presentLoader();
    this.UserData = JSON.parse(localStorage.getItem('UserProfile'));
    this.SalonData = JSON.parse(localStorage.getItem('SalonReffered'));
    this.MyContacts = [];
    this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], { filter: "", multiple: true,  })
      .then(data => {
        //let AContacts = data.sort((a, b) => a.displayName.localeCompare(b.displayName));
        var SlicedContacts = data.slice(0, 100);
        var SortedEL = SlicedContacts.sort(function (a, b) {
          var keyA = new Date(a.displayName),
            keyB = new Date(b.displayName);
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        env.MyContacts = SortedEL;

        setTimeout(() => {
          if (env.MyContacts.length == 0) {
            this.TryAgain();
          }
        }, 5000);
      }, err => {
        console.log(err, 'err while getting contacts');
      });
  }


  SearchByName(SearchString){
    if(SearchString.length >= 4){
    }else{
      return
    }
    let env=this;
    this.MyContacts = [];
    this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], { filter: SearchString, multiple: true,  })
      .then(data => {
        var SlicedContacts = data.slice(0, 100);
        var SortedEL = SlicedContacts.sort(function (a, b) {
          var keyA = new Date(a.displayName),
            keyB = new Date(b.displayName);
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        env.MyContacts = SortedEL;

       
      }, err => {
        console.log(err, 'err while getting contacts');
      });
  }


  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  TryAgain() {
    this.common.presentLoader();
    this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], { filter: "", multiple: true })
      .then(data => {
        //this.MyContacts = data;
        let AContacts = data.sort((a, b) => a.displayName.localeCompare(b.displayName));
        localStorage.setItem(JSON.stringify(AContacts), 'MyAllContacts');
      }, err => {
        console.log(err, 'err while getting contacts');
      });
  }


  SaveRefferal(mobile) {

    if (!this.SalonData) {
      this.SalonData = {}; this.SalonData.b_id = '';
      this.SalonData.name = '';
    }

    let DataSend = {
      code: this.ReferalInviteCode,
      b_id: this.SalonData.b_id,
      referredfrom: this.UserData.id,
      referredto_contact: mobile.replace(/ /g, ""),
      b_name: this.SalonData.name
    }
    this.common.PostMethod("ReferUsers", DataSend).then((res: any) => {

    }, err => {

    });
  }


  checkSMSPermission() {
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
    //   result => console.log('Has permission?', result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
    // );
  }
  requestSMSPermission() {
    // tslint:disable-next-line: max-line-length
   // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS, this.androidPermissions.PERMISSION.BROADCAST_SMS]);
  }


  sendSMS() {
    // this.checkSMSPermission();
    // let env = this;
    // this.ReferalInviteCode = env.SalonData.referralcode.substring(0,7) + '' + env.UserData.id;

    // this.InviteContacts.forEach(function (element, index) {
    //   env.SaveRefferal(element);
    //   let message = "Hello, I have started using My Salon Zone App to manage appointments, billing and much more. Check out the App Now. Use Code - " + this.ReferalInviteCode;

    //   const options = {
    //     replaceLineBreaks: false,
    //     android: { intent: '' }
    //   };
    //   env.sms.send(element, message, options).then(() => {
    //     console.log('in success');
    //   })
    //     .catch(error => {
    //       console.log('error while sending sms', error);
    //     });


    //   if (env.InviteContacts.length - 1 == index) {
    //     env.common.presentToast('Invitation Sent Successfully', 4000);
    //     env.modal.dismiss({ Status: false });
    //   }

    // });

    this.modal.dismiss({ Status: false });
  }



  Invite(PhoneNumber, index) {
    this.InviteContacts.push(PhoneNumber);
    if (this.MyContacts[index].disabled == false || !this.MyContacts[index].disabled) {
      this.MyContacts[index].disabled = true;
    }
    else { this.MyContacts[index].disabled = false; }
  }

  Close() {
    this.modal.dismiss({ Status: false });
  }

}
