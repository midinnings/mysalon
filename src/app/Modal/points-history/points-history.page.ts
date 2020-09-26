import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-points-history',
  templateUrl: './points-history.page.html',
  styleUrls: ['./points-history.page.scss'],
})
export class PointsHistoryPage implements OnInit {

  PointsHistory:any = [];
  UserProfile:any={};
  UserId:any = '';
  constructor(public common:CommonService, public modal:ModalController) { 

  }

  ngOnInit() {

    this.UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    this.UserId = this.UserProfile.id;
    this.common.PostMethod("LoyaltyPointHistory", { id: this.UserProfile.id }).then((res: any) => {
      if(res.Status==1)this.PointsHistory = res.Data;
    },err=>{

    });


  }

  Close(){
    this.modal.dismiss({ Status: false })
  }

}
