import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, ModalController, PopoverController, Events, AlertController } from '@ionic/angular';
import { CommonService } from '../../Service/common.service';
import { SalonTimingPage } from '../../Modal/salontiming/salontiming.page';
import { ServicesPage } from 'src/app/Extra/services/services.page';
import { UserPipe } from 'src/app/Pipes/pipe/user.pipe';
import { ActivatedRoute } from '@angular/router';
import { OfferDetailsPage } from 'src/app/Modal/offer-details/offer-details.page';
// import { LanguagePipe } from 'src/app/Pipes/Language.pipe';
declare var google;
@Component({
  selector: 'app-salon-details',
  templateUrl: './salon-details.page.html',
  styleUrls: ['./salon-details.page.scss'],
})
export class SalonDetailsPage implements OnInit {
  lists: any = {};
  public SalonBanner: any = '';
  SalonLogo: any = '';
  SalonData: any = {};
  Add_On_Images: any = [];
  BrandsListing: any = [];
  SalonParams: any;
  Ratings: any;
  Offers:any = [];
  BusinessData_Issue:boolean = false;
  constructor(public modalController: PopoverController, public router: ActivatedRoute, public alertController: AlertController,
    public geolocation: Geolocation, public nav: NavController, public common: CommonService, public events: Events) {
    this.getCurrentPosition();

    this.router.queryParams.subscribe((res: any) => {
      this.SalonParams = res;
    });
    this.SalonData.Staff = [];
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

  FilterOffers(){
    this.Offers = this.Offers.filter( i => i.type == 'OnService' || i.type == 'Package' || i.type == 'BuynGet' || i.type == 'Flat' || i.type == 'Combo' );
  }

  ngOnInit() {
    this.common.presentLoader();
    let env = this;
    this.lists.CurrentDayStatus = {};
    this.lists.CurrentDayStatus.ValidityStatus = false;
    this.common.PostMethod("Get_Salonby_ID", { id: this.SalonParams.id }).then((res: any) => {
      this.SalonData = res.Data;
      this.SalonLogo = this.common.Url + 'Files/' + this.SalonData.logo;
      if(this.SalonData.Offers){this.Offers = this.SalonData.Offers;this.FilterOffers();}
      if (this.SalonData.OtherServices) {
        this.SalonBanner = this.common.Url + 'Files/' + this.SalonData.OtherServices.salon_banner;
        if(this.SalonData.OtherServices.additional_images) this.Add_On_Images = this.SalonData.OtherServices.additional_images.split(",");
        this.BrandsListing = this.SalonData.BrandsList;
        this.lists.salonTiming = this.SalonData.available_hour;
        this.lists.SalonServices = this.SalonData.SalonServices;
        // this.lists.CurrentDayStatus = this.SalonData.available_hour;
        // debugger
        this.lists.CurrentDayStatus = this.SalonData.available_hour.find(obj => {
          return obj.week == env.Get_Today_DayName();
        });

        let ValidityStatus = this.CheckSalonStatus(this.lists.CurrentDayStatus.day, this.lists.CurrentDayStatus.evening);
        this.lists.CurrentDayStatus.ValidityStatus = ValidityStatus;
      }else{
          this.BusinessData_Issue = true;
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

    // var startTime = '15:10:10';
    //var endTime = '22:30:00';
    //  debugger
    var currentDate = new Date();

    var startDate: any = new Date(currentDate.getTime());
    startDate.setHours(this.getTwentyFourHourTime(startTime).split(":")[0]);
    startDate.setMinutes(this.getTwentyFourHourTime(startTime).split(":")[1]);
    //  startDate.setSeconds(startTime.split(":")[2]);

    var endDate: any = new Date(currentDate.getTime());
    endDate.setHours(this.getTwentyFourHourTime(endTime).split(":")[0]);
    endDate.setMinutes(this.getTwentyFourHourTime(endTime).split(":")[1]);
    // endDate.setSeconds(endTime.split(":")[2]);


    let valid = startDate < currentDate && endDate > currentDate

    return valid;



    // var now: any = new Date();
    // var start: any = this.getTwentyFourHourTime(Start);
    // start = new Date(now.getDate(), start.split(':')[0]);
    // var end: any = this.getTwentyFourHourTime(End);
    // end = new Date(now.getDate(), end.split(':')[0]);
    // now = now.getTime();

    // if (now >= start && now < end) {
    //   console.log("opened");
    //   debugger
    //   return "opened"
    // }
    // else {
    //   console.log("closed");
    //   debugger
    //   return "closed"
    // }


  }


  getTwentyFourHourTime(amPmString) {
    var d = new Date("1/1/2020 " + amPmString);
    return d.getHours() + ':' + d.getMinutes();
  }


  async MarkAsPrefered() {

    let env = this;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'You are about to become loyal customer to this salon: ' + env.SalonData.name,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: ');
          }
        }, {
          text: 'Okay',
          handler: () => {

            env.CallPreferedAPI();

            localStorage.setItem('SalonReferredID', env.SalonData.b_id);
            localStorage.setItem('SalonReffered', JSON.stringify(env.SalonData));
            env.common.presentLoader();
            env.events.publish('ReloadDashboard');
          }
        }
      ]
    });

    await alert.present();
  }


  CallPreferedAPI() {
    let UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    this.common.PostMethod("SetPrefferedSalon", { mobile: UserProfile.mobileno, b_name: this.SalonData.name, code: this.SalonData.referralcode, userid: localStorage.getItem("UserId") }).then((res: any) => {
      console.log(res);
      this.lists.Servicelist = res.Data;
    });
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

 async OfferDetail(OfferDetail){
    const modal = await this.modalController.create({
      component: OfferDetailsPage,
      componentProps: { data: OfferDetail}
    });
    return await modal.present();
  }


}
