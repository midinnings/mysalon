import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UserPipe } from 'src/app/Pipes/pipe/user.pipe';
import { CommonService } from './../../Service/common.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor(public modal: ModalController, public common: CommonService, public router: ActivatedRoute) { }
  lists: any = {}
  Type: any;
  title
  ngOnInit() {
    this.Type = "Daily";
    this.router.queryParams.subscribe((res: any) => {
      if (res.Page) {
        this.title = "My Work";
      } else {
        this.title = "Reports";
      }
    })
    this.GetReport();
  }

  GetReport() {
    if (this.Type == "Custom") {
      // this.Customdateopen();
    } else {
      let from: any = new Date();
      let to: any = new Date();
      if (this.Type == 'Weekly') {
        from = moment(from).subtract(7, 'days');
      }
      if (this.Type == 'Montly') {
        from = moment(from).subtract(30, 'days');
      }
      let userid: any = 0;
      if (localStorage.getItem("UserType") != '2' && localStorage.getItem("UserType") != '6') {
        userid = localStorage.getItem("UserId");
      }
      this.common.PostMethod("GetAppReport", { userid: userid, b_id: new UserPipe().transform('b_id'), from: moment(from).format('YYYY-MM-DD'), to: moment(to).format('YYYY-MM-DD') }).then((res: any) => {
        this.lists = res.Data;
      });
    }
  }




}
