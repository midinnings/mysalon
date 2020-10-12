import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FcmmessageService } from '../../Service/fcmmessage.service';
import { CommonService } from '../../Service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect, NavController, PopoverController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-employer',
  templateUrl: './salon-list.page.html',
  styleUrls: ['./salon-list.page.scss'],
})
export class EmployerPage implements OnInit {
  lists: any = {}
  @ViewChild('searchFliter', { static: false }) searchFliter: IonSelect;
  @ViewChild('searchSort', { static: false }) searchSort: IonSelect;
  items: any = [];
  searchKey: string = "";
  filteredItems: any = [];
  myLat: any = '';
  myLong: any = '';
  constructor(public Arouter: ActivatedRoute, public geolocation: Geolocation, public social: SocialSharing, public nav: NavController, public popoverCtrl: PopoverController, public fcmmessage: FcmmessageService, public router: Router, public common: CommonService) {
    this.lists.sort = "Sort By";
    this.lists.fliter = "Filter By";
    this.lists.fliterOptions = [
      { id: 1, name: 'Unisex Salon', name_hi: 'Unisex Salon' },
      { id: 2, name: 'Gents Salon', name_hi: 'Gents Salon' },
      { id: 3, name: 'Ladies Salon', name_hi: 'Ladies Salon' },
      { id: 4, name: 'Kids Salon', name_hi: 'Kids Salon' },
      { id: 5, name: 'MakeUp Salon', name_hi: 'MakeUp Salon' },
      { id: 6, name: 'Nail Salon', name_hi: 'Nail Salon' },
      { id: 7, name: 'Spa', name_hi: 'Spa' }];
    this.lists.sortOptions = [
      { id: 1, name: 'By Distance', name_hi: 'Distance' },
      { id: 2, name: 'By Area', name_hi: 'By Area' },
    ]
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log({ lat: resp.coords.latitude, lng: resp.coords.longitude });
      this.myLat = resp.coords.latitude;
      this.myLong = resp.coords.longitude;
    });
    this.Arouter.queryParams.subscribe((res: any) => {
      let SearchKey = res.searchKey;
      if (res.searchKey) {
        var Filter = 'distance';
        if (SearchKey == 'On Going Deals') { Filter = 'deals' };
        this.FilterData(Filter, '');
      } else {
        this.geolocation.getCurrentPosition().then((resp) => {
          console.log({ lat: resp.coords.latitude, lng: resp.coords.longitude });
          this.myLat = resp.coords.latitude;
          this.myLong = resp.coords.longitude;

          this.common.PostMethod("Get_Filtered_Salons", { id: localStorage.getItem("UserId"), FilterBy: 'distance', lat: this.myLat, long: this.myLong }).then((res: any) => {
            if (res.Status == 1) {
              this.items = this.filteredItems = res.Data.salons;
            }
            this.common.dismissLoader();
          }, err => {
            this.common.dismissLoader();
          });
        });

      }
    });
  }

  ngAfterViewInit(): void {

  }


  filterList(evt) {
    const searchTerm = evt.target.value;
    if (searchTerm == '' || !searchTerm) {
      this.filteredItems = this.items;
      return
    }

    this.filteredItems = this.items;
    this.filteredItems = this.filteredItems.filter(function (salon) {
      return salon.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
  }


  ngOnInit() {
    this.common.presentLoader();
    // this.lists.language = localStorage.getItem("language")||"English";
  }
  GotoSalon(ev) {
    console.log(ev);
    this.common.PageGoto('Forward', 'salon-details')
  }
  goBack() {
    this.nav.pop();
  }
  ChangeSort(ev) {
    this.lists.flitername = '';
    //  this.searchSort.open();
    if (this.lists.sortname == 'By Distance') {
      this.FilterData('distance', 'all');
    } else {
      this.FilterData('area', 'all');
    }


    /// api 
    console.log(ev.detail.value)
    console.log(this.lists.sort)
  }
  ChangeFliter(ev) {
    this.lists.sortname = '';
    //   if (ev === 'fliter') {
    // this.searchFliter.open();
    this.lists.flitername = ev.detail.value;
    this.FilterData('salon_type', ev.detail.value);
    //  }

    console.log(ev.detail.value)
    console.log(this.lists.fliter)

  }
  async Openpopup(ev) {


    if (ev === 'fliter') {
      this.searchFliter.open();
      //this.FilterData('salon_type', 'salon_type');
    }
    else if (ev === 'sort') {
      this.searchSort.open();
      //   if(this.lists.sortname == 'By Distance'){
      //   //  this.FilterData('distance', 'all');
      //   }else{
      //     //this.FilterData('distance', 'all');
      //   }
    }
  }

  FilterData(Filterby, SalonTypeSpecified) {
    this.common.presentLoader();
    let Data = { id: localStorage.getItem("UserId"), FilterBy: Filterby, salon_type: this.lists.flitername, lat: this.myLat, long: this.myLong }
    this.common.PostMethod("Get_Filtered_Salons", Data).then((res: any) => {
      if (res.Status == 1) {
        this.items = this.filteredItems = res.Data.salons;
      }
      this.common.dismissLoader();
    }, err => {
      this.common.dismissLoader();
    });
  }
}
