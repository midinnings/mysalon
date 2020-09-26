import { InmessageService } from 'src/app/Service/inmessage.service';
import { CommonService } from './../../Service/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(public inmessage: InmessageService, public common: CommonService) { }
  lists: any = {}
  ngOnInit() {
    this.lists.notification = [];
    this.GetMyNotification();
  }

  GetMyNotification() {
    this.common.PostMethod("GetMyNotification", { userid: localStorage.getItem("UserId") }).then((res: any) => {
      this.lists.notification = res.Data;
    });
  }

  UpdateNotify(ev) {
    this.common.PostMethod("UpdateData", { file: "notificationhistory", name: "id", value: ev.id, updatename: "rstatus", updatevalue: 1 }).then((res: any) => {
      if (res.Status == 1) {
        this.inmessage.sendMessage("Dashboard", "Dashboard");
        this.GetMyNotification();
        if (ev.page) {
          this.common.PageGoto('Forward', ev.page);
        }
      }
    });
  }

  MarkasAllRead() {
    let ids = [];
    this.lists.notification.forEach(element => {
      ids.push(element.id);
    });
    this.common.PostMethod("ReadAllNotification", { id: ids }).then((res: any) => {
      if (res.Status == 1) {
        if (res.Status == 1) {
          this.inmessage.sendMessage("Dashboard", "Dashboard");
          this.GetMyNotification();
          this.common.presentToast(res.Message, 4000);
        }
      }
    });
  }

}
