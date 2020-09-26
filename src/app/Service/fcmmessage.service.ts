import { InmessageService } from './inmessage.service';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';

@Injectable({
  providedIn: 'root'
})
export class FcmmessageService {

  constructor(public platform: Platform, public FcmMessage: FirebaseMessaging, public inmessage: InmessageService) { }

  GetToken() {
    if (this.platform.is("android")) {
      //  fcm package error get token exists on package FCM

      this.FcmMessage.requestPermission().then(function () {
        console.log("Push messaging is allowed currently");
      },err=>{
        console.log(err);
      }).catch(y => {
        console.log(y);
      });

      this.FcmMessage.getToken().then((res: any) => {
        if (!localStorage.getItem("FCMToken")) {
          localStorage.setItem("FCMToken", res);
        }
      }, err => {
        console.log('Firebase Error Occured', err);
      });
    }
  }


  GetForgroundMessage() {
    if (this.platform.is("android")) {
      this.FcmMessage.onMessage().subscribe((res: any) => {
        console.log(res);
        this.inmessage.sendMessage("Dasboard", "Dashboard");
      }, error => {
        console.log(error);
      })
    }
  }

  GetBackgroundMessage() {
    if (this.platform.is("android")) {
      this.FcmMessage.onBackgroundMessage().subscribe((res: any) => {
        console.log(res);
        this.inmessage.sendMessage("Dasboard", "Dashboard");
      }, error => {
        console.log(error);
      })
    }
  }


}



