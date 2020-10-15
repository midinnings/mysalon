import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, AlertController, LoadingController, NavController, ActionSheetController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  //public Url:any = "http://192.168.0.120/mysalonzone/api/public/";
  //public Url: any = "http://mysalonzone.in/staging/public/";  // Staging Hosting API------------------
  //public Url: any = "http://localhost/mysalone/public/";
  Url: any = "http://api.mysalonzone.in/";
  Website: any = "http://mysalonzone.in/";
  AdminWebsite: any = "http://admin.mysalonzone.in/#/";
  isLoading: boolean = false;

  constructor(public launchNavigator: LaunchNavigator, public inapp: InAppBrowser, public actionSheetController: ActionSheetController, public navCtrl: NavController, public http: HttpClient, public toastController: ToastController, public alertController: AlertController, public loadingController: LoadingController) { }
  GetMethod(MapUrl) {
    return new Promise((resolve, reject) => {
      this.http.get(this.Url + MapUrl).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  PostMethod(MapUrl, Data) {
    console.log(MapUrl, Data);
    return new Promise((resolve, reject) => {
      this.http
        .post(this.Url + MapUrl, Data)
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  MeesageSend(MapUrl) {
    return new Promise((resolve, reject) => {
      this.http
        .get(MapUrl)
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  async presentToast(Message, Timer) {
    const toast = await this.toastController.create({
      message: Message,
      duration: Timer,
      position: "bottom"
    });
    toast.present();
  }
  async BasicAlert(Header, Subtitle, Message, Buttons?) {
    const alert = await this.alertController.create({
      header: Header,
      subHeader: Subtitle,
      message: `${Message}`,
      buttons: Buttons || ["Ok"]
    });
    alert.present();
  }

  async presentLoader() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 5000,
      spinner: "circles",
      message: "Please Wait...",
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismissLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  PageGoto(Type, Page, Data?) {
    if (!Data) {
      Data = {};
    }
    let Options: NavigationExtras = {
      queryParams: Data
    }
    if (Type == 'Forward') {
      this.navCtrl.navigateForward("/" + Page, Options)
    } if (Type == 'Root') {
      this.navCtrl.navigateRoot("/" + Page, Options);
    }
  }

  Base64toblob(b64Data) {
    let contentType = 'image/png'; let sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  fileUpload(ev, Callback) {
    console.log(ev);
    let file = new FormData();
    file.append('file', ev);
    this.PostMethod("RawFile", file).then((res: any) => {
      console.log(res);
      if (res.Status == 1) {
        Callback({ Status: true, filename: res.Filename });
      } else {
        Callback({ Status: false });
      }
    })
  }

  async Confirm(Message, callback) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: Message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            callback(true);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            callback(false);
          }
        }
      ]
    });

    await alert.present();
  }

  OpenUrl(url, isinapp) {
    isinapp = parseInt(isinapp);
    if (isinapp) {
      this.navCtrl.navigateForward("/" + url);
    } else {
      this.inapp.create(url, '_self', 'location=no');
    }
  }


  GetDatePickerObj() {
    let datePickerObj: any = {
      inputDate: new Date(), // default new Date()
      // fromDate: new Date(), // default null
      toDate: new Date(), // default null
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

    return datePickerObj;
  }

  GetRefferalCode(Code) {
    let Code_P = Code;
    let BCodeSize = 8;
    if (Code_P) {
      return Code_P = Code_P.substring(0, BCodeSize);
    } else {
      return '';
    }
  }


  LaunchNavigation_App(destination) {
    this.launchNavigator.navigate(destination)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  SplitTime(DateTime_V) {
    if (DateTime_V) {
      let TimeOnly = DateTime_V.split(' ')[1];
      let Phase = DateTime_V.split(' ')[2];
      if (TimeOnly) {
        return TimeOnly+' '+Phase;
      } else {
        return '00:00:00';
      }

    } else {
      return '00:00:00';
    }
  }

}
