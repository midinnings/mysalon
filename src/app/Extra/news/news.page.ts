import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';
import { UserPipe } from 'src/app/Pipes/pipe/user.pipe';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  constructor(public common: CommonService) { }
  lists: any = {};

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
  };

  ngOnInit() {
    this.GetNewslist();
  }

  GetNewslist() {
    this.common.presentLoader();
    this.common.PostMethod("GetNews", { language: new UserPipe().transform('language'), usertype: localStorage.getItem("UserType") }).then((res: any) => {
      this.lists.newslist = res.Data;
      this.common.dismissLoader();
    },err=>{
      this.common.dismissLoader();
    });
  }

  GOtoDetails(ev) {
    this.common.PageGoto('Forward', 'newsdetails', { Data: ev, Type: Event });
  }
}
