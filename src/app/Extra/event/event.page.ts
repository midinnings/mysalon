import { UserPipe } from 'src/app/Pipes/pipe/user.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  constructor(public common: CommonService) { }
  lists: any = {}

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,

  };
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.GetEventsList();
  }

  GetEventsList() {
    this.common.presentLoader();
    this.common.PostMethod("GetEvents", {
      b_id: new UserPipe().transform('b_id'), userid: localStorage.getItem("UserId"), language: new UserPipe().transform('language'), usertype: localStorage.getItem("UserType")
    }).then((res: any) => {
      this.common.dismissLoader();
      this.lists.eventlist = res.Data;
    },err=>{
      this.common.dismissLoader();
    });
  }
  GOtoDetails(ev) {
    this.common.PageGoto('Forward', 'endetails', { Data: ev, Type: Event });
  }

}
