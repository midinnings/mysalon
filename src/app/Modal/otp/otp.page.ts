import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';
import { NavParams, ModalController } from '@ionic/angular';
declare var SMS: any;
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  constructor(public fb: FormBuilder, public modal: ModalController, public common: CommonService, public navParams: NavParams) { }
  lists: any = {};
  OTPVerify: FormGroup;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInputRef: any;
  ngOnInit() {
    this.SendOTP(this.navParams.data);
    this.OTPVerify = this.fb.group({
      VOTP: new FormControl('', Validators.required)
    });
  }

  SendOTP(ev) {
    this.lists.Timer = 60;
    this.lists.Mobile = ev.Mobile;
    this.lists.OTP = ev.OTP;
    let test = setInterval(() => {
      this.lists.Timer = this.lists.Timer - 1;
      if (this.lists.Timer == 0) {
        clearInterval(test);
      }
    }, 1000);
    let Message = "Welcome to My Salon Zone App Your 6 Digit OTP is " + ev.OTP;
    // this.start();
    this.common.PostMethod("SendOTPSms", { message: Message, mobile: this.lists.Mobile }).then((res: any) => {
      console.log(res);
    });



  }

  Verify() {
    let verify = false;
    if (this.lists.VOTP == this.lists.OTP) {
      this.modal.dismiss({ Verified: true });
    } else {
      this.common.presentToast("OTP Mismatch", 4000);
    }
  }
  onOtpChange(ev) {
    this.lists.VOTP = ev;
  }

  Cancel() {
    this.modal.dismiss({ Verified: false });
  }

  start() {
    SMS.startWatch(
      () => {
        document.addEventListener('onSMSArrive', (e: any) => {
          var IncomingSMS = e.data;
          this.processSMS(IncomingSMS);
        });
      },
      () => { console.log('watch start failed') }
    )
  }

  stop() {
    SMS.stopWatch(
      () => { console.log('watch stopped') },
      () => { console.log('watch stop failed') }
    )
  }

  processSMS(data) {
    const message = data.body;
    if (message && message.indexOf('My Salon Zone') != -1) {
      this.ngOtpInputRef.setValue(data.body.substr(data.body.length - 6));
      this.stop();
    }
  }

}
