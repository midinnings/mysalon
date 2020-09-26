import { StriphtmlPipe } from './../../Pipes/striphtml.pipe';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LimittoPipe } from 'src/app/Pipes/limitto.pipe';

@Component({
  selector: 'app-newsdetails',
  templateUrl: './newsdetails.page.html',
  styleUrls: ['./newsdetails.page.scss'],
})
export class NewsdetailsPage implements OnInit {

  constructor(public sanitize: DomSanitizer, public router: ActivatedRoute, public common: CommonService, public social: SocialSharing) { }
  lists: any = {};
  ngOnInit() {
    this.router.queryParams.subscribe((res: any) => {
      this.lists = res.Data;
    });
  }

  Sharenews() {
    this.common.presentLoader();
    let message = new StriphtmlPipe().transform(this.lists.news);
    message = new LimittoPipe().transform(message, 120);
    let file = [encodeURI(this.common.Url + 'Files/' + this.lists.coverimage)];
   // let url = this.common.AdminWebsite + 'news-single/' + this.lists.title;
   var TitleProcessed = this.lists.title.replace(/-/gi, '_');
   TitleProcessed = TitleProcessed.replace(/\s/g, '-');
   let url = this.common.Website + 'blog/latest/' + TitleProcessed;
    message = this.lists.title + "\n\n" + message;
    this.social.share(message, this.lists.title, file, url).then((res: any) => {
      this.common.dismissLoader();
    }).catch(y => {
      this.common.dismissLoader();
    });
  }
}
