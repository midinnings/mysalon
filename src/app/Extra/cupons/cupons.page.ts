import { UserPipe } from 'src/app/Pipes/pipe/user.pipe';
import { CommonService } from './../../Service/common.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.page.html',
  styleUrls: ['./cupons.page.scss'],
})
export class CuponsPage implements OnInit {

  constructor(public modal: ModalController, public common: CommonService) { }
  lists: any = {};
  ngOnInit() {
    this.lists.Myoffers=[];
    this.GetMyOffers();
    
  }
  close() {
    this.modal.dismiss({ status: false });
  }

  GetMyOffers() {
    this.common.PostMethod("GetOffers", { b_id: localStorage.getItem('SalonSelectedAppoint'), userid: localStorage.getItem("UserId"), usertype: new UserPipe().transform('usertype') }).then((res: any) => {
      console.log(res);
      this.lists.Myoffers = res.Data;
    });
  }

  SaveCupon(ev) {
    this.modal.dismiss({ status: true, Data: ev })
  }

  ApplyCode(ev) {
    this.common.PostMethod("CheckCupon", { couponid: this.lists.couponid, code: this.lists.Code}).then((res: any) => {
      if (res.Status == 1) {
        this.SaveCupon(ev);
      } else {
        this.common.presentToast(res.Message, 4000);
      }
    });

  }
  ApplyCupon(ev) {
    this.lists.Code = ev.couponcode;
    this.lists.couponid = ev.id;
    // this.ApplyCode(ev);
    this.SaveCupon(ev);
  }
}
