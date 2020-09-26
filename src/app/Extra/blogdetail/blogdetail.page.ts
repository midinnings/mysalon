import { LimittoPipe } from './../../Pipes/limitto.pipe';
import { StriphtmlPipe } from './../../Pipes/striphtml.pipe';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.page.html',
  styleUrls: ['./blogdetail.page.scss'],
})
export class BlogdetailPage implements OnInit {

  constructor(public social: SocialSharing, public common: CommonService, public router: ActivatedRoute) { }
  lists: any = {}
  ngOnInit() {
    this.router.queryParams.subscribe((res: any) => {
      this.lists = res.Data;
    });
  }

  Shareblog() {
    this.common.presentLoader();
    let message = new StriphtmlPipe().transform(this.lists.description);
    message = new LimittoPipe().transform(message, 120);
    let file = [encodeURI(this.common.Url + 'Files/' + this.lists.coverImage)];
    //let url = this.common.Website + 'blog_single.html?type=App&id=' + this.lists.id;
    var TitleProcessed = this.lists.title.replace(/-/gi, '_');
    TitleProcessed = TitleProcessed.replace(/\s/g, '-');
    let url = this.common.Website + 'blog/latest/' + TitleProcessed;
    console.log(file);
    message = this.lists.title + "\n\n" + message;
    this.social.share(message, this.lists.title, file, url).then((res: any) => {
      this.common.dismissLoader();
    }).catch(y => {
      this.common.dismissLoader();
    });
  }
}
