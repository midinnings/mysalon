import { FormBuilder, FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.page.html',
  styleUrls: ['./passwordreset.page.scss'],
})
export class PasswordresetPage implements OnInit {
  passwordchange: FormGroup;
  constructor(public navParams: NavParams, public modal: ModalController, public fb: FormBuilder, public common: CommonService) { }

  ngOnInit() {
    let data = this.navParams.data;
    console.log(data);
    this.passwordchange = this.fb.group({
      mobile: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])),
      Password: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required),
    });
    this.passwordchange.controls['mobile'].setValue(data.mobile);
  }
  close() {
    this.modal.dismiss();
  }

  CustSave() {
    this.common.presentLoader();
    if (this.passwordchange.value.Password != this.passwordchange.value.confirmpassword) {
      this.common.dismissLoader();
      this.common.presentToast("Password or Confirm Password Do Not Match Please Check Again!", 4000);
    } else {
      this.common.PostMethod("ForgotPassword", this.passwordchange.value).then((res: any) => {
        this.common.dismissLoader();
        if (res.Status == 1) {
          this.common.presentToast(res.Message, 4000);
          this.modal.dismiss({ Status: true });
        } else {
          this.common.presentToast(res.Message, 4000);
        }
      });
    }
  }
}
