import { UserPipe } from './../../Pipes/pipe/user.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {

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
    this.common.PostMethod("GetBloglist", { language: new UserPipe().transform('language'), usertype: localStorage.getItem("UserType") }).then((res: any) => {
      this.lists.bloglist = res.Data;
      this.common.dismissLoader();
    },err=>{
      this.common.dismissLoader();
    });
  }
  GOtoDetails(ev) {
    this.common.PageGoto('Forward', 'blogdetail', { Data: ev, Type: Event });
  }

}
