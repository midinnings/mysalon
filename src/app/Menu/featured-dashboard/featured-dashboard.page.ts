import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, ModalController, PopoverController, IonSlides } from '@ionic/angular';
import { CommonService } from '../../Service/common.service';
import { SalonTimingPage } from '../../Modal/salontiming/salontiming.page';
import { ServicesPage } from 'src/app/Extra/services/services.page';
import { UserPipe } from 'src/app/Pipes/pipe/user.pipe';
import { ActivatedRoute } from '@angular/router';
import { OfferDetailsPage } from 'src/app/Modal/offer-details/offer-details.page';
// import { LanguagePipe } from 'src/app/Pipes/Language.pipe';
declare var google;
@Component({
  selector: 'app-featured-dashboard',
  templateUrl: './featured-dashboard.page.html',
  styleUrls: ['./featured-dashboard.page.scss'],
})
export class FeaturedDashboardPage implements OnInit {
  lists: any = {};
  public SalonBanner: any = '';
  SalonLogo: any = '';
  SalonData: any = {};
  Add_On_Images: any = [];
  BrandsListing: any = [];
  SalonParams: any;
  Ratings: any;
  Offers: any = [];

  @ViewChild('slides1', { static: false }) slides1: IonSlides;
  @ViewChild('slides2', { static: true }) slides2: IonSlides;
  @ViewChild('slides3', { static: false }) slides3: IonSlides;
  slideOpts1 = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: true,
  };
  slideOpts2 = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  slideOpts3 = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };


  constructor(public modalController: PopoverController, public router: ActivatedRoute,
    public geolocation: Geolocation, public nav: NavController, public common: CommonService,) {
    this.getCurrentPosition();

    // if user is refered and fixed salon page needs to show---------------------------
    let SavedRefferal = localStorage.getItem('SalonReffered');

    if (SavedRefferal) {
      SavedRefferal = JSON.parse(SavedRefferal);
      this.SalonParams = SavedRefferal;
    } else {
      this.router.queryParams.subscribe((res: any) => {
        this.SalonParams = res;

      });
    }
    this.lists.dashboardwid = {};
    this.lists.dashboardwid.notifications = 0;

  }
  GetSlider() {
    let id = 0;
    if (localStorage.getItem("UserType") == "2" || localStorage.getItem("UserType") == "6") {
      id = 1;
    } else {
      id = 2;
    }
    this.common.PostMethod("GetBanners", { id: id }).then((res: any) => {
      this.lists.sliders = res.Data;
    });
  }
  ngOnInit() {
    let env = this;
    this.lists.CurrentDayStatus = {};
    this.lists.CurrentDayStatus.ValidityStatus = false;
    this.common.PostMethod("Get_Salonby_ID", { id: this.SalonParams.id }).then((res: any) => {
      this.SalonData = res.Data;
      this.SalonLogo = this.common.Url + 'Files/' + this.SalonData.logo;
      if (this.SalonData.OtherServices) {
        this.SalonBanner = this.common.Url + 'Files/' + this.SalonData.OtherServices.salon_banner;
        if (this.SalonData.OtherServices.additional_images) this.Add_On_Images = this.SalonData.OtherServices.additional_images.split(",");
        this.BrandsListing = this.SalonData.BrandsList;
        this.lists.salonTiming = this.SalonData.available_hour;
        this.lists.SalonServices = this.SalonData.SalonServices;
        if (this.SalonData.Offers) { this.Offers = this.SalonData.Offers }
        // this.lists.CurrentDayStatus = this.SalonData.available_hour;
        // debugger
        this.lists.CurrentDayStatus = this.SalonData.available_hour.find(obj => {
          return obj.week == env.Get_Today_DayName();
        });

        let ValidityStatus = this.CheckSalonStatus(this.lists.CurrentDayStatus.day, this.lists.CurrentDayStatus.evening);
        this.lists.CurrentDayStatus.ValidityStatus = ValidityStatus;
      }

      if (this.SalonData.salon_rating) {
        this.Ratings = this.SalonData.salon_rating.split(',');

        this.lists.salonRating = [{
          rating_Name: 'Overall',
          rating_Count: this.Ratings[0]
        }, {
          rating_Name: 'Ambiance',
          rating_Count: this.Ratings[1]
        },
        {
          rating_Name: 'Corona Safety',
          rating_Count: this.Ratings[2]
        }, {
          rating_Name: 'Waiting Time',
          rating_Count: this.Ratings[3]
        }];
      }
    });


    this.common.PostMethod("GetBusinesslists", { b_id: this.SalonParams.id }).then((res: any) => {
      console.log(res);
      this.lists.Servicelist = res.Data;
    });
    this.GetBlogs();
    this.common.PostMethod("GetMyNotification", { userid: localStorage.getItem("UserId") }).then((res: any) => {
      this.lists.dashboardwid.notifications = res.Data.length;
    });


  }

  GetBlogs() {
    this.common.PostMethod("DashboardBlog", { userid: localStorage.getItem("UserId"), usertype: localStorage.getItem("UserType"), b_id: new UserPipe().transform('b_id'), language: new UserPipe().transform('language') }).then((res: any) => {
      this.lists.bloglist = res.Data.Blog;
      this.lists.newslist = res.Data.News;
      this.lists.eventlist = res.Data.Event;

    });
  }


  goBack() {
    this.nav.pop()
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
          this.lists.current_location = address.formatted_address;
        }
      );
  }

  call() {
    console.log('call')
  }
  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geocodePosition({ lat: resp.coords.latitude, lng: resp.coords.longitude });
    });
  }
  async Openpopup(page) {
    const modal = await this.modalController.create({
      component: SalonTimingPage,
      componentProps: { data: this.lists.salonTiming, type: 'timing' }
    });
    return await modal.present();
  }
  async OpenpopupServices(ev) {

    const modal = await this.modalController.create({
      component: SalonTimingPage,
      componentProps: { data: this.lists.Servicelist, type: 'service' }

    });
    return await modal.present();
  }



  Get_Today_DayName() {
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var d = new Date();
    var dayName = days[d.getDay()];
    console.log(dayName)
    return dayName;
  }

  CheckSalonStatus(startTime, endTime) {
    var currentDate = new Date();
    var startDate: any = new Date(currentDate.getTime());
    startDate.setHours(this.getTwentyFourHourTime(startTime).split(":")[0]);
    startDate.setMinutes(this.getTwentyFourHourTime(startTime).split(":")[1]);
    var endDate: any = new Date(currentDate.getTime());
    endDate.setHours(this.getTwentyFourHourTime(endTime).split(":")[0]);
    endDate.setMinutes(this.getTwentyFourHourTime(endTime).split(":")[1]);
    let valid = startDate < currentDate && endDate > currentDate
    return valid;
  }


  getTwentyFourHourTime(amPmString) {
    var d = new Date("1/1/2020 " + amPmString);
    return d.getHours() + ':' + d.getMinutes();
  }

  next(ev) {
    if (ev == 1) {
      this.slides1.slideNext();
    }
    if (ev == 2) {
      this.slides2.slideNext();
    }
    if (ev == 3) {
      this.slides3.slideNext();
    }
  }
  pre(ev) {
    if (ev == 1) {
      this.slides1.slidePrev();
    }
    if (ev == 2) {
      this.slides2.slideNext();
    }
    if (ev == 3) {
      this.slides3.slideNext();
    }
  }

  Gotoenpage(ev) {
    this.common.PageGoto('Forward', ev, {});
  }

  LaunchNav() {
    let Geolocation = this.SalonData.geolocation;
    if (Geolocation) {
      Geolocation = JSON.parse(Geolocation);
      this.common.LaunchNavigation_App([Geolocation.lat, Geolocation.lng]);
    } else {
      this.common.LaunchNavigation_App([this.SalonData.name]);
    }
  }

  async OfferDetail(OfferDetail) {
    const modal = await this.modalController.create({
      component: OfferDetailsPage,
      componentProps: { data: OfferDetail }
    });
    return await modal.present();
  }

}




