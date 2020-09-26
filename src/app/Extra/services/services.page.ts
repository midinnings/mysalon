import { UserPipe } from './../../Pipes/pipe/user.pipe';
import { CommonService } from './../../Service/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  lists: any = {};
  constructor(public common: CommonService) { }

  ngOnInit() {
    this.GetServiceList();
  }

  GetServiceList() {
    this.common.PostMethod("GetBusinesslists", { b_id: new UserPipe().transform("b_id") }).then((res: any) => {
      console.log(res);
      this.lists.Servicelist = res.Data;
    });
  }

}
