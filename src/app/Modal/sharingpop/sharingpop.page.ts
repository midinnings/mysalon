import { CommonService } from './../../Service/common.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-sharingpop',
  templateUrl: './sharingpop.page.html',
  styleUrls: ['./sharingpop.page.scss'],
})
export class SharingpopPage implements OnInit {

  constructor(public social: SocialSharing, public modal: ModalController, public navParams: NavParams, public common: CommonService) { }
  lists: any = {}
  ngOnInit() {
    console.log(this.navParams.data.id);
    this.GetTemplate();
  }

  GetTemplate() {
    this.common.PostMethod("GetTemplate", { categories: [this.navParams.data.id] }).then((res: any) => {
      this.lists.templatelist = res.Data;
    });
  }

  close() {
    this.modal.dismiss({ Status: false });
  }

  Share(ev) {
    let Data: any = {};
    if (ev == 0) {
      Data.messageenglish = this.lists.Message;
      Data.coverimage = this.lists.templatelist[0].coverimage;
      Data.cname = this.lists.templatelist[0].cname
    } else {
      this.lists.templatelist.forEach(element => {
        if (element.id == ev) {
          Data = element;
        }
      });
    }
    this.common.presentLoader();
    this.social.share(Data.messageenglish, Data.cname, [this.common.Url + 'Files/' + Data.coverimage], '').then((res: any) => {
      this.common.dismissLoader();
      this.modal.dismiss({ Status: true });
    }).catch(y => {
      this.common.dismissLoader();
      this.modal.dismiss({ Status: false });
    });
  }
}
