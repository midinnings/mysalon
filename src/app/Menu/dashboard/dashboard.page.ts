import { InmessageService } from './../../Service/inmessage.service';
import { UserPipe } from './../../Pipes/pipe/user.pipe';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonSlides, IonSelect, PopoverController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { FcmmessageService } from 'src/app/Service/fcmmessage.service';
import { Router } from '@angular/router';
import { ReviewPage } from 'src/app/Modal/review/review.page';
declare var google;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  lists: any = {};
  subscription: Subscription;
  item: any = {};
  @ViewChild('searchSalon', { static: false }) searchSalon: IonSelect;
  @ViewChild('slides1', { static: false }) slides: IonSlides;
  @ViewChild('slides2', { static: true }) slides_one: IonSlides;
  @ViewChild('slides3', { static: false }) slides_two: IonSlides;
  @ViewChild('slides4', { static: false }) slides_four: IonSlides;
  @ViewChild('map', { static: false }) mapElement: ElementRef;

  FeaturedSlideOptions = {
    initialSlide: 0,
    slidesPerView: 2,
    autoplay: false,
    pagination: false
  };
  slideOpts1 = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    pagination: false
  };
  slideOpts2 = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    pagination: false
  };
  slideOpts3 = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    pagination: false
  };
  slideOpts4 = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false,
    pagination: false
  };
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  sliderThree: any = {
    isBeginningSlide: true,
    isEndSlide: false,
    pagination: false
  }
  slideOptsThree = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: true,
    pagination: false
  };
  sliderFour: any = {
    isBeginningSlide: true,
    isEndSlide: false,
    pagination: false
  }
  slidFour = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: true,
    pagination: false
  };
  Dashboard_Data: any = [];
  URL_Image: any = '';
  Testimonials: any = [];
  LastVisited: any;
  constructor(public common: CommonService, public inmessage: InmessageService,
    public geolocation: Geolocation, public Modal: ModalController,
    public fcmmessage: FcmmessageService, public router: Router) {
    this.lists.bloglist = [];
    this.lists.eventlist = [];
    this.lists.newslist = [];
    this.URL_Image = this.common.Url + '/Files/';
    this.lists.dashboardwid = {};
    this.lists.searchList = [{
      id: 1,
      name: 'Near By',
      name_hi: 'Near By'
    },
    // {
    //   id: 2,
    //   name: 'On Going Deals',
    //   name_hi: 'On Going Deals'
    // }
  
  ]
    this.item.title = "my salon app";
    this.lists.search = "Choose An Option To Find Salon";
    this.item.visteddate = new Date()
    this.lists.dashboardwid.notifications = 0;
    this.subscription = this.inmessage.getMessage().subscribe((res: any) => {
      if (res.Page == "Dashboard") {
        this.lists.dashboardwid = {};
        setTimeout(() => {
          this.lists.usertype = localStorage.getItem("UserType");
        }, 500);
      
        this.GetBlogs();
        this.GetSlider();
      }
    });

    this.LoadNotifications();
    let env = this;
    setInterval

    setInterval(() => {
      env.LoadNotifications();
    }, 10000);
  }

  ionViewDidLoad() {
    this.GetDashboardInfo();
  }

  LoadNotifications() {
    this.common.PostMethod("GetMyNotification", { userid: localStorage.getItem("UserId") }).then((res: any) => {
      this.lists.dashboardwid.notifications = res.Data.length;
    });
  }

  ionViewWillLeave() {
    this.slides.stopAutoplay();
    this.slides_one.stopAutoplay();
    this.slides_two.stopAutoplay();
  }
  slidesDidLoad(slides) {
    slides.startAutoplay();
  }



  ngOnInit() {
    this.GetDashboardInfo();
    this.GetBlogs();
    this.GetSlider();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log({ lat: resp.coords.latitude, lng: resp.coords.longitude });
      this.geocodePosition({ lat: resp.coords.latitude, lng: resp.coords.longitude });

    });
  }

  geocodePosition(pos) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode
      ({
        latLng: pos
      },
        (results, status) => {
          let address = results[0];
          let geocoder = new google.maps.Geocoder();
          geocoder.geocode({ 'address': address.formatted_address }, (results, status) => {
            this.lists.latitude = results[0].geometry.location.lat();
            this.lists.longitude = results[0].geometry.location.lng();
            this.lists.placeid = results[0].place_id;
            this.lists.pincode = results[0].address_components[results[0].address_components.length - 1]['long_name'];
            console.log("hi" + "__" + results[0].address_components[results[0].address_components.length - 3]['long_name']);
          });
        }
      );
  }
  ionViewWillEnter() {

    this.GetDashboardInfo();

    this.lists.prefferdProducts = [{
      img: './assets/img/logo.png',
      name: 'My salon Products',
      ratings: 4.3
    },
    {
      img: './assets/img/user-img.jpg',
      name: 'Champian Salon Products'
    }, {
      img: './assets/img/user-img.jpg',
      name: 'Remaining Products',
      ratings: 2.3
    }, {
      img: './assets/img/logo.png',
      name: 'My salon Products',
      ratings: 3.5
    },
    {
      img: './assets/img/user-img.jpg',
      name: 'Champian Salon Products',
      ratings: 4.6
    }, {
      img: './assets/img/user-img.jpg',
      name: 'Remaining Products',
      ratings: 4.5
    }]
    this.lists.dashboardwid = {};

    setTimeout(() => {
      this.lists.usertype = localStorage.getItem("UserType");
      this.lists.logo = new UserPipe().transform('logo');
    }, 500);
    // this.GetDashboardInfo();
    // this.GetBlogs();

    this.GetUserProfile();
  }

  GetUserProfile() {
    this.common.PostMethod("GetProfile", { Id: localStorage.getItem("UserId") }).then((res: any) => {
      res.Data.status = parseInt(res.Data.status);
      if (res.Data.status == 0) {
        localStorage.clear();
        setTimeout(() => {
          this.fcmmessage.GetToken();
          window.location.reload();
          this.router.navigate(['/login']);
        }, 1000);
      }
    });
  }

  GetFirstRating(salon_rating) {
    if (salon_rating.includes(',')) {
      var Ratings = salon_rating.split(',');
      return Ratings[0];
    } else {
      0
    }
  }

  ChooseOption() {

    this.common.PageGoto('Forward', '/tabs/employer', { 'searchKey': this.lists.search });
    this.lists.search = 'Choose An Option To Find Salon';
  }
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    // slideView.isBeginning().then((istrue) => {
    //   object.isBeginningSlide = istrue;
    // });
  }
  checkisEnd(object, slideView) {
    //giving error
    // slideView.isEnd().then((istrue) => {
    //   object.isEndSlide = istrue;
    // });
  }
  GotoPage(ev) {
    if (ev == 'festivalnvishes') {
      this.common.presentToast("Feature Coming Soon", 4000);
    } else {
      this.common.PageGoto('Forward', ev, {});
    }
  }
  Gotoenpage(ev) {
    this.common.PageGoto('Forward', ev, {});
  }
  GetBlogs() {
    this.common.PostMethod("DashboardBlog", { userid: localStorage.getItem("UserId"), usertype: localStorage.getItem("UserType"), b_id: new UserPipe().transform('b_id'), language: new UserPipe().transform('language') }).then((res: any) => {
      this.lists.bloglist = res.Data.Blog;
      this.lists.newslist = res.Data.News;
      this.lists.eventlist = res.Data.Event;
    });
  }

  GetDashboardInfo() {
    this.common.PostMethod("Get_Customer_Dashboard", { userid: localStorage.getItem("UserId"), usertype: localStorage.getItem("UserType"), b_id: new UserPipe().transform('b_id'), from: moment().format('YYYY-MM-DD'), to: moment().format('YYYY-MM-DD') }).then((res: any) => {
      this.Dashboard_Data = res.Data;
      if (res.Data.lastvisited) {
        if (res.Data.lastvisited.length != 0) {
          this.LastVisited = res.Data.lastvisited;
        }
      }
    }, err => {
      this.common.presentToast("Server Error Occured, Please Try After Sometime...", 8000);
    });

    this.common.GetMethod("GetTestimonial").then((res: any) => {
      this.Testimonials = res.Data;
    });
  }



  next(ev) {
    debugger
    if (ev == 1) {
      this.slides.slideNext();
    }
    if (ev == 2) {
      this.slides_one.slideNext();
    }
    if (ev == 3) {
      this.slides_two.slideNext();
    }
  }
  pre(ev) {
    debugger
    if (ev == 1) {
      this.slides.slidePrev();
    }
    if (ev == 2) {
      this.slides_one.slidePrev();
    }
    if (ev == 3) {
      this.slides_two.slidePrev();
    }
  }

  GetSlider() {

    this.common.PostMethod("GetBanners", { id: 1 }).then((res: any) => {
      this.lists.sliders = res.Data;
    });
  }

  async Openpopup() {
    this.searchSalon.open();
  }

  search() {
    this.common.PageGoto('Forward', "employer")
    console.log(this.lists.search);
  }
  async reviewPopup() {
    let refferal = await this.Modal.create({
      component: ReviewPage
    })
    await refferal.present();
  }


}
