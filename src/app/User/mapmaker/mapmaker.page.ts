import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
declare var google;

@Component({
  selector: 'app-mapmaker',
  templateUrl: './mapmaker.page.html',
  styleUrls: ['./mapmaker.page.scss'],
})
export class MapmakerPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  lists: any = {};
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  service = new google.maps.places.AutocompleteService();
  directionForm: FormGroup;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  constructor(public navCtrl: NavController, public zone: NgZone, public geolocation: Geolocation, public router: ActivatedRoute) {
    this.lists.autocompleteItems = [];
  }
  ngOnInit() {
    this.router.queryParams.subscribe((res: any) => {
      console.log(res);
      if (res.address) {
        this.geoCode(res.address);
      }
    })
  }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 16,
        mapTypeId: 'roadmap',
        center: { lat: resp.coords.latitude, lng: resp.coords.longitude },
      });
      console.log({ lat: resp.coords.latitude, lng: resp.coords.longitude });
      let marker = new google.maps.Marker(
        {
          map: this.map,
          draggable: true,
          mapTypeId: 'raodmap',
          animation: google.maps.Animation.DROP,
          position: { lat: resp.coords.latitude, lng: resp.coords.longitude }
        });
      google.maps.event.addListener(marker, 'dragend', () => {
        this.geocodePosition(marker.getPosition());
      });
      this.directionsDisplay.setMap(this.map);
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
            console.log(results[0]);
            this.lists.latitude = results[0].geometry.location.lat();
            this.lists.longitude = results[0].geometry.location.lng();
            this.lists.placeid = results[0].place_id;
            this.lists.pincode = results[0].address_components[results[0].address_components.length - 1]['long_name'];
          });
        }
      );
  }

  ionViewDidLoad() {
  }

  updateSearch(ev) {
    if (ev.target.value == '') {
      this.lists.autocompleteItems = [];
      return;
    }

    this.service.getPlacePredictions({
      input: ev.target.value,
      componentRestrictions: {
        country: 'in'
      }
    }, (predictions, status) => {
      this.lists.autocompleteItems = [];

      this.zone.run(() => {
        if (predictions != null) {
          predictions.forEach((prediction) => {
            this.lists.autocompleteItems.push(prediction);
          });
        }
      });
    });
  }

  geoCode(address: any) {
    this.lists.autocompleteItems = [];
    this.lists.address = address;
    this.lists.addressbar = address;
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
      console.log(results[0]);
      this.lists.latitude = results[0].geometry.location.lat();
      this.lists.longitude = results[0].geometry.location.lng();
      this.lists.placeid = results[0].place_id;
      this.lists.pincode = results[0].address_components[results[0].address_components.length - 1]['long_name'];
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 16,
        mapTypeId: 'roadmap',
        center: { lat: this.lists.latitude, lng: this.lists.longitude },
      });
      let marker = new google.maps.Marker(
        {
          map: this.map,
          draggable: true,
          mapTypeId: 'raodmap',
          animation: google.maps.Animation.DROP,
          position: { lat: this.lists.latitude, lng: this.lists.longitude }
        });
      google.maps.event.addListener(marker, 'dragend', () => {
        this.geocodePosition(marker.getPosition());
      });
      this.directionsDisplay.setMap(this.map);
    });
  }

  Backtoaddress() {
    this.lists.searchaddress = true;
    let option: NavigationExtras = {
      queryParams: this.lists
    }
    this.navCtrl.navigateForward('businessregister', option);
  }


}
