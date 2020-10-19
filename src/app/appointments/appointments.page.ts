import { AppointmenttimestatusPage } from './../Modal/appointmenttimestatus/appointmenttimestatus.page';
import { ModalController, IonSelect, NavController } from '@ionic/angular';
import { InmessageService } from './../Service/inmessage.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControlName, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../Service/common.service';
import { DatePipe } from '@angular/common';
import { UserPipe } from '../Pipes/pipe/user.pipe';
import * as moment from 'moment';
import { CuponsPage } from '../Extra/cupons/cupons.page';
import { BookingConfirmPage } from '../Modal/booking-confirm/booking-confirm.page';
import { parse } from 'querystring';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  eventSource = [];
  eventSource1 = [];
  calendar = {
    locale: 'en-GB',
    mode: 'month',
    timemode: 'day',
    currentDate: new Date(),
    currenttime: new Date(),
  };
  lists: any = {};
  book: FormGroup;
  price: number = 0;
  SalonParams: any = {};
  DiscountValues: any = {};
  Final_DiscountAvail: number = 0;
  Amount_Pay: number = 0;
  CustomCoupon: any = '';
  AppliedCoupon: any = '';
  Loyalty_Points_Redemption: any = 0;
  MAX_Apply: any = 0;
  PointsValue: any = 0;
  UserCurrentPoints: any = 0;
  Loyalty_Point_Applied: boolean = false;
  OffersFound: any = {};

  ApplyPackage: boolean = false;
  constructor(public modal: ModalController, public nav: NavController, public common: CommonService, public fb: FormBuilder, public router: ActivatedRoute, public inmessage: InmessageService) {
    this.lists.appointmentdate = new Date();
    this.lists.eventtime = [];
    this.lists.price = 0;
    this.lists.payableamount = 0;
    this.lists.couponCode = "not Applied"
    this.lists.Events = [];
    this.lists.Times = ["12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM", "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"];
    let env = this;
  }

  ngOnInit() {
    let env = this;
    this.lists.Discount = 0;
    this.lists.DiscountType = "P";
    this.lists.applycoupon = {};
    this.book = this.fb.group({
      couponCode: new FormControl(''),
      service: new FormControl(''),
      stylist: new FormControl('', Validators.required)
    });

    this.router.queryParams.subscribe(res => {
      this.SalonParams = res;
      console.log(res, 'salon params');
      localStorage.setItem('SalonSelectedAppoint', this.SalonParams.b_id);

      setTimeout(() => {
        //this.GetUserTime();
        this.Getservice();
        this.GetStylist();
      }, 1000);

      this.common.PostMethod("UpdateBusinessSettings", { b_id: this.SalonParams.id }).then((res: any) => {
        if (res.Status == 1) {
          let DataServices = res.Data;
          if (DataServices) {
            this.MAX_Apply = DataServices.max_apply;
            this.PointsValue = DataServices.points_value;
          }
        }
      });
      
      this.lists.CurrentDayStatus = this.SalonParams.available_hour.find(obj => {
        return obj.week == env.Get_Today_DayName();
      });


    });

    this.common.PostMethod("GetProfile", { Id: localStorage.getItem('UserId') }).then((res: any) => {
      let DataUser = res.Data;
      this.UserCurrentPoints = JSON.parse(DataUser.loyalty_points);
    }, err => {
    });
  }


  Get_Today_DayName() {
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var d = new Date();
    var dayName = days[d.getDay()];
    console.log(dayName)

    return dayName;
  }


  async OpenCoupon() {
    let env = this;
    const custmodal = await this.modal.create({
      component: CuponsPage,
      showBackdrop: true,
      componentProps: this.lists
    });
    //   if (this.book.value.service.length > 0) {
    await custmodal.present();
    let { data } = await custmodal.onWillDismiss();
    if (data.status) {
      this.ApplyDiscountConcession(data.Data);
    }
    // } else {
    //   let msg = "please add one service to activate Coupons";
    //   this.common.presentToast(msg, 1000)
    // }
  }

  ResetDiscounts() {
    this.lists.packageservicelist = [];
    this.CustomCoupon = '';
    this.Amount_Pay = this.lists.price;
    this.Loyalty_Point_Applied = false;
    this.Loyalty_Points_Redemption = 0;

    this.Final_DiscountAvail = 0;

  }


  ApplyLoyaltyDiscount() {
    this.CustomCoupon = '';
    
    //When User Points is more than max apply----------then apply till max apply points
    if (this.Loyalty_Point_Applied == true) {
      this.ResetDiscounts();
      return
    }
    if (this.UserCurrentPoints >= this.MAX_Apply) {
      //When Max Apply Points is current then billing-----------------------
      //Check MaxApply is greater than billing price or not
      let MaxApply_Converted = this.MAX_Apply/this.PointsValue;
      if (MaxApply_Converted >= this.lists.price) {
        this.Loyalty_Points_Redemption = this.lists.price;
        this.Amount_Pay = 0;
      } else {
        // Substract only max values
        this.Loyalty_Points_Redemption = MaxApply_Converted;
        this.Amount_Pay = this.lists.price - MaxApply_Converted;
      }
    } else {
      // When Current User Points is more than Payable amount----------------------------
      let UserWalletPoints_Converted = this.UserCurrentPoints/this.PointsValue;
      if (UserWalletPoints_Converted > this.lists.price) {
        this.Loyalty_Points_Redemption = this.lists.price;
        this.Amount_Pay = 0;
      } else {
        this.Loyalty_Points_Redemption = UserWalletPoints_Converted;
        this.Amount_Pay = this.lists.price - this.Loyalty_Points_Redemption;
      }
    }
    this.Loyalty_Point_Applied = true;
  }


  // ApplyLoyaltyDiscount() {
    //old code when loyalty points shows ruppee equals
  //   this.CustomCoupon = '';
  //   //When User Points is more than max apply----------then apply till max apply points
  //   if (this.Loyalty_Point_Applied == true) {
  //     this.ResetDiscounts();
  //     return
  //   }
  //   if (this.UserCurrentPoints >= this.MAX_Apply) {
  //     //When Max Apply Points is current then billing-----------------------
  //     if (this.MAX_Apply >= this.lists.price) {
  //       this.Loyalty_Points_Redemption = this.lists.price;
  //       this.Amount_Pay = 0;
  //     } else {
  //       // Simple Substraction of Loyalty point
  //       this.Loyalty_Points_Redemption = this.MAX_Apply;
  //       this.Amount_Pay = this.lists.price - this.Loyalty_Points_Redemption;
  //     }
  //   } else {
  //     // When Current User Points is more than Payable amount----------------------------
  //     if (this.UserCurrentPoints > this.lists.price) {
  //       this.Loyalty_Points_Redemption = this.lists.price;
  //       this.Amount_Pay = 0;
  //     } else {
  //       this.Loyalty_Points_Redemption = this.UserCurrentPoints;
  //       this.Amount_Pay = this.lists.price - this.Loyalty_Points_Redemption;
  //     }
  //   }
  //   this.Loyalty_Point_Applied = true;
  // }

  UpdateLoyaltyPoints() {

  }

  ApplyLoyalty(value) {
    if (value == 'on') this.ApplyLoyaltyDiscount();
  }

  ApplyDiscountConcession(DataCoupon) {

    this.ResetDiscounts();
    let values = this.DiscountValues = DataCoupon;
    this.lists.applycoupon = values;
   
    //this.book.controls['couponCode'].setValue(values.couponcode);
    // Apply Check by Percentage or Direct Cost Cutting--------------
    if (DataCoupon.type == 'OnService' || DataCoupon.type == 'Flat') {
      this.ApplyPackage = false;
      this.DirectDiscount(values);
    } else {
      // Apply Combo/Package Discounts---------------------------------
      this.PackageDiscount(values);
    }
  }

  RemovePackage() {
    this.ApplyPackage = false;
    this.lists.price = 0;
    this.Amount_Pay = 0;
    this.CustomCoupon = '';
  }

  DirectDiscount(values) {
    if (this.book.value.service.length == 0) { this.common.presentToast('Please select services to proceed..', 2000); return }
    if (values.discounttype == 'Amount') { this.lists.Discount = parseInt(values.discount); }
    else if (values.discounttype == 'Percent') { this.lists.Discount = (this.lists.price * (parseInt(values.discount) / 100)); }
    else { this.common.presentToast("Coupon is not valid or expired..", 2000); return; }
    // Apply Date Check Now--------------------------------------------
    if (!this.dateCheck(values.startdate, values.enddate)) { this.common.presentToast("Coupon is expired..", 2000); return; }
    this.lists.couponCode = values.couponcode;
    this.book.controls['couponCode'].setValue(values.couponcode);
    //---Applying Discount on Flat or service basis----------------------------------------
    if (this.DiscountValues.type == 'OnService') {
      let CountServices = this.book.value.service.length;
      this.AppliedCoupon = this.lists.couponCode;
     
      this.lists.Discount = parseInt(this.lists.Discount);
      this.Final_DiscountAvail = CountServices * this.lists.Discount;
      this.Amount_Pay = this.lists.price - this.Final_DiscountAvail;
      this.lists.payableamount = this.Amount_Pay;
    }
    else if (this.DiscountValues.type == 'Flat') {
      this.AppliedCoupon = this.lists.couponCode;
      this.Final_DiscountAvail = this.lists.Discount = parseInt(this.lists.Discount);
      this.Amount_Pay = this.lists.price - this.lists.Discount;
      this.lists.payableamount = this.Amount_Pay;
    }
  }

  PackageDiscount(values) {
    this.lists.couponCode = values.couponcode;
    // Applying package discounts and making other service carges-----------------
    this.Amount_Pay = values.discount;
    this.AppliedCoupon = values.couponcode;
    let ServiceIds = values.services.split(',');
    this.lists.packageservicelist = []
    ServiceIds.forEach(element => {
      let ServiceFound = this.lists.servicelist.filter(i => i.serviceid == element);
      if (ServiceFound) {
        this.lists.packageservicelist.push(ServiceFound[0]);
      }
    });
    this.ApplyPackage = true;
  }

  totalamount() {
    this.ResetDiscounts();
    //this.CheckOffer();
    let env = this;
    let price: number = 0;
    if (this.book.value.service) {
      console.log(this.book.value.service);
      this.book.value.service.forEach(function (ServiceId, index) {
        var resServiceObject = env.lists.servicelist.filter(function (item) {
          return item.serviceid == ServiceId;
        });
        if (resServiceObject[0]) { price = price + parseInt(resServiceObject[0].serviceprice); } else { price = 0; }
      });
    }
    this.lists.price = price;
    this.lists.payableamount = price;
    this.Amount_Pay = price;
    return (this.lists.price);
  }

  markDisabled = (date: Date) => {
    let current = new Date();
    let mydate = current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + (current.getDate());
    current = new Date(mydate);
    return date <= current;
  };
  goBack() {
    this.nav.pop()
  }
  onEventSelected(ev) {
    console.log(ev);
  }
  onViewTitleChanged(ev) {
    this.lists.title = ev;
  }
  onTimeSelected(ev) {
    this.lists.appointmentdate = ev.selectedTime;
    this.calendar.currenttime = ev.selectedTime;
  }
  onTimeSelected1(ev) {
    var now = new Date();
    if (ev.selectedTime < now) {
      console.log("Selected date is in the past");
      this.common.presentToast('Please select future time for an appointment', 2000);
      return;
    }

    if(this.lists.CurrentDayStatus){
      if (!this.TimeCheck(this.lists.CurrentDayStatus.day, this.lists.CurrentDayStatus.evening, ev.selectedTime)) {
        this.common.presentToast('Please select appointment time according to salon availability', 2000);
        return;
      }
    }
  
    this.lists.selectedtime = ev.selectedTime;
    let startDate: any = moment(ev.selectedTime);
    let end: any = moment(ev.selectedTime).add(1, 'hours');
    this.lists.Events = [{
      startTime: new Date(startDate),
      endTime: new Date(end),
      allDay: false,
      color: "primary"
    }];

    this.eventSource1 = this.lists.Events;
    this.CheckTimeStatus(new DatePipe('en-GB').transform(this.lists.appointmentdate, 'yyyy-MM-dd') + ' ' + new DatePipe('en-GB').transform(this.lists.selectedtime, 'hh:mm:ss a'));
  }
  GetUserTime() {
    //let BusinessProfile = JSON.parse(localStorage.getItem("UserProfile"));
    // this.lists.Weekinfo = BusinessProfile.Businessinfo.Timing;
  }

  Getservice() {
    this.common.PostMethod("GetFilterData", { file: "ub_service", name: "userid", value: this.SalonParams.b_id || this.SalonParams.id, orderwith: "service", orderby: "ASC" }).then((res: any) => {
      this.lists.servicelist = res.Data;
    });
  }

  GetStylist() {
    this.common.PostMethod("GetFilterData", { file: "userlogin", name: "b_id", value: this.SalonParams.b_id }).then((res: any) => {
      this.lists.userlist = res.Data;
    });
  }

  async SaveAppointment() {
    debugger
    let UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    this.common.presentLoader();
    let id = 0;
    if (this.lists.bookid) {
      id = this.lists.bookid;
    }
    let time = new DatePipe('en-GB').transform(this.lists.selectedtime, 'hh:mm:ss a');
    if (!time) {
      this.common.dismissLoader();
      this.common.presentToast("Please Select Appointment time", 4000);
    } else {
      this.lists.prefeereddate = new DatePipe('en-GB').transform(this.lists.appointmentdate, 'yyyy-MM-dd') + ' ' + new DatePipe('en-GB').transform(this.lists.selectedtime, 'hh:mm:ss a');
      let Payment = this.Amount_Pay;
      if (this.ApplyPackage == true) {
        Payment = this.DiscountValues.discount;
        this.book.value.service = "[]";
      } else {
        if (this.book.value.service.length == 0) {
          this.common.presentToast('Please select atleast one service..', 2000);
          return;
        } else {
          this.book.value.service = JSON.stringify(this.book.value.service);
          //this.AppliedCoupon = "";
          //this.DiscountValues.id="";
        }
      }
      let Data = {
        id: id,
        'userid': localStorage.getItem("UserId"),
        'b_id': this.SalonParams.b_id,
        'customer_name': UserProfile.name,
        'contactno': UserProfile.mobileno,
        'email': UserProfile.email,
        'salon': this.SalonParams.name,
        'gender': UserProfile.gender,
        'service': this.book.value.service,
        'prefeerddate': this.lists.prefeereddate,
        'comments': '',
        'employee': this.book.value.stylist,
        'appointmentstatus': 'Waiting',
        'coupon_applied': this.AppliedCoupon,
        'coupon_id': this.DiscountValues.id,
        'cost': this.Amount_Pay
      }
      this.lists.PaymentMode = ""
      let checkoutDetails = {
        totalamount: this.lists.payableamount,
        discount: this.lists.Discount,
        PaymentMode: this.lists.PaymentMode,
        total: parseInt(this.lists.payableamount) + parseInt(this.lists.Discount)
      }
      this.common.PostMethod("CreateAppointment", Data).then((res: any) => {
        if (res.Status == "1") {
          this.common.dismissLoader();
          this.common.presentToast(res.Message, 3000);
          setTimeout(() => {
            this.inmessage.sendMessage("Check Start Service", "Dashboard");
          }, 100);
          this.book.reset();
          this.eventSource1 = [];
          if (res.Data && this.Loyalty_Point_Applied) this.DeductLoyaltyPoints(res.Data);
          this.nav.pop();
        } else {
          this.common.dismissLoader();
          this.common.presentToast(res.Message, 4000);
        }
      });
    }
  }

  DeductLoyaltyPoints(AppointmentID) {
    let env = this;
    let Data = {
      'userid': localStorage.getItem('UserId'),
      'points': this.Loyalty_Points_Redemption,
      'appointmentId': AppointmentID,
      'b_id': this.SalonParams.b_id,
    }
    this.common.PostMethod("DeductLoyaltyPoints", Data).then((res: any) => {
      if (res.Status == 0) {
        setTimeout(() => {
          env.DeductLoyaltyPoints(AppointmentID);
        }, 2000);
      } else {

      }
    });
  }

  // for user details
  SelectedCustomer(ev) {
    console.log(ev);
    this.book.controls['cname'].setValue(ev.name);
    this.book.controls['cmobile'].setValue(ev.mobile);
    this.book.controls['gender'].setValue(ev.gender);
    setTimeout(() => {
      this.lists.Customerlist = [];
    }, 200);
  }
  CheckTimeStatus(ev) {
    let from = moment(ev).format('YYYY-MM-DD');
    let to = moment(ev).format('YYYY-MM-DD');
    let userid: any = 0;
    if (localStorage.getItem("UserType") != "2" && localStorage.getItem("UserType") != "6") {
      userid = localStorage.getItem("UserId")
    }
    this.common.PostMethod("AppointmentTimeStatus", { userid: userid, from: from, to: to, b_id: new UserPipe().transform('b_id') }).then((res: any) => {
      this.lists.pendinglists = res.Data;
      if (res.Data.length > 0) {
        this.OpenAppointmentPopup(res.Data);
      }
    });
  }

  async OpenAppointmentPopup(ev) {
    const modal = await this.modal.create({
      component: AppointmenttimestatusPage,
      cssClass: 'viewtimestatus',
      showBackdrop: true,
      componentProps: { appointment: ev }
    });
    return await modal.present();
  }
  ApplyCoupon() {

    console.log(this.book.value.couponCode);
    let data = { file: 'offer', name: 'couponcode', value: this.CustomCoupon };
    this.common.PostMethod("GetFilterData", data).then((res: any) => {
      if (res.Status == 1) {
        if (res.Data.length != 0) {
          let CouponExtractData = res.Data[0];
          this.ApplyDiscountConcession(CouponExtractData);
        } else {
          let msg = "Coupon Code is not valid..";
          this.common.presentToast(msg, 2000);
        }

      } else {
        let msg = "Coupon Code is not valid..";
        this.common.presentToast(msg, 2000);
      }
    });
  }

  dateCheck(from, to) {
    var fDate, lDate, cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(new Date().toJSON().slice(0, 10));

    if ((cDate <= lDate && cDate >= fDate)) {
      return true;
    }
    return false;
  }


  TimeCheck(from, to, checktime) {

  //  var dateObj = new Date();
    var month = checktime.getUTCMonth() + 1; //months from 1-12
    var day = checktime.getUTCDate();
    var year = checktime.getUTCFullYear();

    var newdate = year + "/" + month + "/" + day;
    var FromTime = newdate+' ' + from;
    var ToTime = newdate+' ' + to;
    var aDate = new Date(FromTime).getTime();
    var bDate = new Date(ToTime).getTime();
    var cDate = Date.parse(checktime);
    if ((cDate <= bDate && cDate >= aDate)) {
      return true;
    } else {
      return false;
    }

  }

}


// var start =  8 * 60 + 30;
// var end   = 17 * 60 + 0;

// function inTime() {
//   var now = new Date();
//   var time = now.getHours() * 60 + now.getMinutes();
//   return time >= start && time < end;
// }
