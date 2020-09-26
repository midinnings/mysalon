import { StriphtmlPipe } from './../../Pipes/striphtml.pipe';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';
import { LimittoPipe } from 'src/app/Pipes/limitto.pipe';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-endetails',
  templateUrl: './endetails.page.html',
  styleUrls: ['./endetails.page.scss'],
})
export class EndetailsPage implements OnInit {
  lists: any = {};
  constructor(public santize: DomSanitizer, public share: SocialSharing, public router: ActivatedRoute, public common: CommonService) { }

  ngOnInit() {
    this.router.queryParams.subscribe((res: any) => {
      this.lists = res.Data;
      if (this.lists.eventvidoe) {
        this.lists.eventvidoe = this.santize.bypassSecurityTrustResourceUrl(this.lists.eventvidoe);
      }
    });
  }

  Shareevent() {
    this.common.presentLoader();
    let message = new StriphtmlPipe().transform(this.lists.description);
    message = new LimittoPipe().transform(message, 120);
    let file = [encodeURI(this.common.Url + 'Files/' + this.lists.coverImage)];
   // let url = this.common.Website + 'event_single.html?type=App&id=' + this.lists.id;
    //let url = this.common.AdminWebsite + 'event-single/' + this.lists.eventname;
    var TitleProcessed = this.lists.eventname.replace(/-/gi, '_');
    TitleProcessed = TitleProcessed.replace(/\s/g, '-');
    let url = this.common.Website + 'blog/latest/' + TitleProcessed;
    message = this.lists.eventname + "\n\n" + new LimittoPipe().transform(message, 120);
    this.share.share(message, this.lists.eventname + ' Starting at ' + this.lists.startdatetime, file, url).then((res: any) => {
      this.common.dismissLoader();
    }).catch(y => {
      this.common.dismissLoader();
    });
  }

}
