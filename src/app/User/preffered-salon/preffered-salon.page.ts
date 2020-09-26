import { Component, OnInit } from '@angular/core';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { CommonService } from 'src/app/Service/common.service';

@Component({
  selector: 'app-preffered-salon',
  templateUrl: './preffered-salon.page.html',
  styleUrls: ['./preffered-salon.page.scss'],
})
export class PrefferedSalonPage implements OnInit {
  lists: any = {};
  constructor( public common: CommonService) { }
  ngOnInit() {
  }
  ionViewDidEnter() {
    // this.qrScanner.prepare()
    //   .then((status: QRScannerStatus) => {
    //     if (status.authorized) {
    //       this.preview(true);
    //       this.qrScanner.show();
    //       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
    //         //console.log('Scanned something', text);
    //         this.preview(false);
    //         console.log("Scanned something", text);
    //         this.lists.qrDetails = text;
    //         this.qrScanner.hide(); // hide camera preview
    //         scanSub.unsubscribe(); // stop scanning
    //       });

    //     } else if (status.denied) {
    //       let permissionmsg = 'permission was denied';
    //       alert(permissionmsg);
    //     } else {
    //       let permissionmsg = "permission was denied, but not permanently. You can ask for permission again at a later time";
    //       alert(permissionmsg);
    //     }
    //   })
    //   .catch((e: any) => console.log('Error is', e));
  }

  preview(show: boolean) {
    if (show) {
      (window.document.querySelector("ion-app") as HTMLElement).classList.add("cameraView");
      window.document.body.style.backgroundColor = "transparent";
    } else {
      (window.document.querySelector("ion-app") as HTMLElement).classList.remove("cameraView");
      window.document.body.style.backgroundColor = '#FFF';
    }
  }
  confirmSalons() {
    console.log('scan qr data', this.lists.qrDetails);

    this.common.PageGoto("Root", "/tabs/featured-dashboard");
  }
  GotoDashboard() {
    console.log('skip option data', {})
    /// api method call
    this.common.PageGoto("Root", "/tabs/dashboard");
  }
}
