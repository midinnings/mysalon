import { CommonService } from '../../Service/common.service';
import { UserPipe } from 'src/app/Pipes/pipe/user.pipe';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-salontiming',
  templateUrl: './salontiming.page.html',
  styleUrls: ['./salontiming.page.scss'],
})
export class SalonTimingPage implements OnInit {
  lists: any;
  listtype: any;
  constructor(public modal: PopoverController, public navparams: NavParams,
    public fb: FormBuilder, public common: CommonService) {
    console.log('openpop')
  }
  expenseform: FormGroup;
  ngOnInit() {

    this.lists = this.navparams.data.data;
    
    this.listtype = this.navparams.data.type;
  }

  close() {
    this.modal.dismiss();
  }
}
