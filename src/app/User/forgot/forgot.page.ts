import { PasswordresetPage } from './../../Modal/passwordreset/passwordreset.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Service/common.service';
import { ValidmessageService } from 'src/app/Service/validmessage.service';
import { ModalController } from '@ionic/angular';
declare var SMS: any;

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  forgotForm: FormGroup;
  OTPForm: FormGroup;
  lists: any = {};

  @ViewChild('ngMobileInput', { static: false }) ngMobileInputRef: any;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInputRef: any;
  constructor(public valid: ValidmessageService, public fb: FormBuilder, public common: CommonService, public modal: ModalController) {
    this.lists.ShowOTP = false;
  }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      mobile: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
    });
    this.OTPForm = this.fb.group({
      OTP: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])),
    });
  }
  onMobileChange(ev) {
    this.forgotForm.value.mobile = ev;
  }
  Forgotpassword() {
    this.common.GetMethod("CheckUser?mobile=" + this.forgotForm.value.mobile).then((res: any) => {
      if (res.Status == 1) {
        this.common.presentToast(res.Message, 4000);
      } else {
        if (res.UserType == 3 || res.UserType == '3') {
          this.lists.ShowOTP = true;
          this.lists.RandomNumber = Math.floor(100000 + Math.random() * 900000);
          console.log(this.lists.RandomNumber);
          this.lists.Timer = 60;
          let test = setInterval(() => {
            this.lists.Timer = this.lists.Timer - 1;
            if (this.lists.Timer == 0) {
              clearInterval(test);
            }
          }, 1000);
          let Message = "Welcome to My Salon Zone App Your forgot password 6 Digit OTP is " + this.lists.RandomNumber;
          // this.start();
          this.common.PostMethod("SendOTPSms", { message: Message, mobile: this.forgotForm.value.mobile }).then((res: any) => {
            console.log(res);
          });
        } else {
          this.common.presentToast('Please try with another number, this phone number is already registered for business services..', 3000);
        }


      }
    });
  }
  onOtpChange(ev) {
    this.lists.VOTP = ev;
  }
  VerifyOTP() {
    let verify = false;
    if (this.lists.VOTP == this.lists.RandomNumber) {
      this.OpenModal();
    } else {
      this.common.presentToast("OTP Mismatch", 4000);
    }
  }

  async OpenModal() {
    const modal = await this.modal.create({
      component: PasswordresetPage,
      showBackdrop: true,
      componentProps: { mobile: this.forgotForm.value.mobile },
      cssClass: 'addcustomer',
    });
    await modal.present();
    let { data } = await modal.onWillDismiss();
    if (data.Status) {
      this.common.presentToast("Forgot Password Sucessfully", 4000);
      this.common.PageGoto("Root", "login");
    }
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
