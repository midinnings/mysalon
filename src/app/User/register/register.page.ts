import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/Service/common.service';
import { ValidmessageService } from 'src/app/Service/validmessage.service';
import { OtpPage } from 'src/app/Modal/otp/otp.page';
import { RefferalPage } from 'src/app/modal/refferal/refferal.page';
const email_pattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerform: FormGroup;
  lists: any = {};
  datePickerObj: any = this.common.GetDatePickerObj();
  UserData = {};
  constructor(public Modal: ModalController, public valid: ValidmessageService, public common: CommonService,
    public menu: MenuController, public Fb: FormBuilder) {
    this.lists.Timer = 60;
    this.lists.passwordtype = "password";
    this.lists.confpasswordtype = "password";
  }

  ngOnInit() {
    this.registerform = this.Fb.group({
      mobile: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      refercode: new FormControl(''),
      confirmpassword: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      terms: new FormControl(false, [Validators.requiredTrue]),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(email_pattern)]))
    }, { validators: this.checkPasswords })
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmpassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  Readterms() {
    this.common.PageGoto('Forward', 'terms');
  }
  CheckDateValidate(ev) {
    let sdate = new Date(ev.detail.value);
    let today = new Date();
    if (sdate > today) {
      this.registerform.controls["dob"].setValue("");
      this.common.BasicAlert("Alert !", "", "Please do not Select Future Date.");
    }
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  Proceed() {
    this.OtpValidator(this.registerform.value.mobile);

  }

  CheckUserAvalability() {
    this.common.GetMethod("CheckUser?mobile=" + this.registerform.value.mobile).then((res: any) => {
      if (res.Status == 0) {
        this.lists.Avalabile = false;
        this.common.presentToast(res.Message, 4000);
      }
      else {
        this.lists.Avalabile = true;
      }
    });
  }


  async OtpValidator(mobile) {
    let env=this;
    this.lists.Timer = 60;
    this.lists.RandomNumber = Math.floor(100000 + Math.random() * 900000);
    const modal = await this.Modal.create({
      component: OtpPage,
      componentProps: {
        OTP: this.lists.RandomNumber,
        Mobile: mobile
      }
    });
    await modal.present();
    modal.onWillDismiss().then((result: any) => {
      this.common.presentLoader();
      if (result.data.Verified) {
        this.common.PostMethod("CustomerRegistration", this.UserData).then((res: any) => {

          if (res.Status == 1) {

            this.common.presentToast('User Registered Successfully', 4000);
            //-------------------------------------------------------------
            localStorage.setItem("UserId", res.Data.id);
            localStorage.setItem("UserProfile", JSON.stringify(res.Data));
            localStorage.setItem("UserType", res.Data.usertype);
            localStorage.setItem("language", res.Data.language);
            //-------------------------------------------------------------
            this.RefferalCode();
           
          } else {
            this.common.presentToast('Unable to Register User ' + res.Message, 4000);
          }
          this.common.dismissLoader();

        }, err => {
          this.common.dismissLoader();
          this.common.presentToast('Unexpected error occured, Please try again after sometime', 4000);
          //this.RefferalCode();
        });


        //this.RefferalCode()
        //user registration api call



        //
      }
    });
  }


  async RefferalCode() {
    let refferal = await this.Modal.create({
      component: RefferalPage
    })
    await refferal.present();
    await refferal.onWillDismiss().then((result: any) => {
      
      if (result.data.Status) {
        console.log(result.refercode);
        this.registerform.controls["refercode"].setValue(result.refercode);
       // this.common.PageGoto('Forward', 'salon-details', JSON.parse(localStorage.getItem('SalonReffered')));
           this.common.PageGoto('Forward', '/tabs/featured-dashboard', this.registerform.value);
      }
      else {
        this.registerform.controls["refercode"].setValue(null);
        this.common.PageGoto('Forward', '/tabs/dashboard', this.registerform.value);
      }


    });

  }

}
