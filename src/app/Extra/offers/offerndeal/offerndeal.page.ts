import { UserPipe } from 'src/app/Pipes/pipe/user.pipe';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/Service/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offerndeal',
  templateUrl: './offerndeal.page.html',
  styleUrls: ['./offerndeal.page.scss'],
})
export class OfferndealPage implements OnInit {
  eventSource = [];
  calendar = {
    locale: 'en-GB',
    mode: 'month',
    currentDate: new Date(),
  };

  offerform: FormGroup;

  lists: any = {};

  datePickerObj: any = {
    inputDate: new Date(), // default new Date()
    showTodayButton: false, // default true
    closeOnSelect: true, // default false
    disableWeekDays: [], // default []
    mondayFirst: true, // default false
    setLabel: 'S',  // default 'Set'
    todayLabel: 'T', // default 'Today'
    closeLabel: 'Cancel', // default 'Close'
    titleLabel: 'Select a Date', // default null
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    dateFormat: 'YYYY-MM-DD', // default DD MMM YYYY
    clearButton: false, // default true
    momentLocale: 'en-US', // Default 'en-US'
    yearInAscending: true, // Default false
    btnCloseSetInReverse: true, // Default false
    btnProperties: {
      expand: 'block', // Default 'block'
      fill: '', // Default 'solid'
      size: '', // Default 'default'
      disabled: '', // Default false
      strong: '', // Default false
      color: '' // Default ''
    },
    arrowNextPrev: {
      nextArrowSrc: 'assets/images/arrow_right.svg',
      prevArrowSrc: 'assets/images/arrow_left.svg'
    }, // This object supports only SVG files.
    highlightedDates: [
      { date: new Date('2019-09-10'), color: '#ee88bf', fontColor: '#fff' },
      { date: new Date('2019-09-12'), color: '#50f2b1', fontColor: '#fff' }
    ], // Default [],
    isSundayHighlighted: {
      fontColor: '#ee88bf' // Default null
    } // Default {}
  };

  constructor(public common: CommonService, public modal: ModalController, public fb: FormBuilder, public navCtrl: NavController) {
    this.lists.from = new Date();
    this.lists.to = new Date();

  }
  onEventSelected(ev) {
    console.log(ev);
  }
  onViewTitleChanged(ev) {
    console.log(ev);
    this.lists.title = ev;
  }
  onTimeSelected(ev) {
    console.log(ev);
    // this.calendar.currentDate = new Date(ev.selectedTime);
    this.lists.from = new Date(ev.selectedTime);
    this.lists.to = new Date(ev.selectedTime);

  }

  ngOnInit() {
    this.offerform = this.fb.group({
      type: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl(),
      couponcode: new FormControl(''),
      startdate: new FormControl('', Validators.required),
      enddate: new FormControl('', Validators.required),
      usage: new FormControl(''),
      noftime: new FormControl(0),
      discounttype: new FormControl('', Validators.required),
      discount: new FormControl(0, Validators.required),
      applysetting: new FormControl('', Validators.required),
      services: new FormControl('')
    });
    this.GetServicelist();
  }

  GetServicelist() {
    this.common.PostMethod("GetBusinesslists", { b_id: new UserPipe().transform("b_id") }).then((res: any) => {
      console.log(res);
      this.lists.Servicelist = res.Data;
    });

  }

  SaveOffer() {
    this.common.presentLoader();
    this.offerform.value.b_id = new UserPipe().transform('b_id');
    this.offerform.value.userid = localStorage.getItem("UserId");
    this.common.PostMethod("CreateOffer", this.offerform.value).then((res: any) => {
      this.common.dismissLoader();
      if (res.Status == 1) {
        this.common.presentToast(res.Message, 4000);
        this.navCtrl.back();
      } else {
        this.common.presentToast(res.Message, 4000);
      }
    });
  }
  Back() {
    this.navCtrl.back();
  }

}
