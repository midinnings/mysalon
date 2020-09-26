import { CommonService } from './../../Service/common.service';
import { UserPipe } from './../../Pipes/pipe/user.pipe';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contactform: FormGroup;
  constructor(public common: CommonService, public fb: FormBuilder) { }

  ngOnInit() {
    this.contactform = this.fb.group({
      name: new FormControl(),
      mobile: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])),
      message: new FormControl()
    });
    this.contactform.controls['name'].setValue(new UserPipe().transform('name'));
    this.contactform.controls['mobile'].setValue(new UserPipe().transform('mobileno'));
  }

  submitcontact() {
    this.contactform.value.b_id = new UserPipe().transform('b_id');
    this.contactform.value.userid = new UserPipe().transform('id');
    this.common.PostMethod("SaveContact", this.contactform.value).then((res: any) => {
      if (res.Status == 1) {
        this.common.presentToast(res.Message, 4000);
        this.contactform.reset();
      } else {
        this.common.presentToast(res.Message, 4000);
      }
    });
  }

}
