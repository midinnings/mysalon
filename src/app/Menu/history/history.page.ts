import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CommonService } from 'src/app/Service/common.service';
import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import * as moment from 'moment';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CheckoutreceiptPage } from 'src/app/Modal/checkoutreceipt/checkoutreceipt.page';
import { ModalController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-jobs',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class JobsPage implements OnInit {
  items: any = [];
  items1: any = [];
  receiptData: { Status: boolean; Data: any; finish: boolean; Info: any; filename: string; };
  externalDataRetrievedFromServer = [];

  constructor(public alertCtrl: AlertController, public fileopen: FileOpener, public modal: ModalController, public common: CommonService,
    public file: File, public social: SocialSharing) {
    for (let i = 1; i < 5; i++) {
      let appointmentStatus = "";
      if (i == 1) {
        appointmentStatus = "Checkout SuccessFul"
      }
      else if (i == 2) {
        appointmentStatus = "Canceled"
      }
      else if (i == 2) {
        appointmentStatus = "Canceled"
      }
      else if (i == 2) {
        appointmentStatus = "Canceled"
      }
      this.items.push({
        billId: Math.floor(100000 + Math.random() * 900000),
        date: new Date(),

      });

    }

  }
  lists: any = {};
  image: any;
  ngOnInit() {

    this.common.PostMethod("GetMyAppointments", { id: localStorage.getItem("UserId") }).then((res: any) => {
      this.items1 = res.Data;
      this.common.dismissLoader();
    });

    let profile = JSON.parse(localStorage.getItem("UserProfile"));
    this.lists.logo = profile.logo;
    // this.GetSlider();
    this.common.presentLoader();
    this.common.GetMethod("GetProfileBase64?id=" + profile.id).then((res: any) => {
      this.common.dismissLoader();
      this.image = res.Data;
    });
  }
  ionViewWillEnter() {
    let profile = JSON.parse(localStorage.getItem("UserProfile"));
    this.lists.logo = profile.logo;
    let env = this;
    setInterval(() => {
      this.common.PostMethod("GetMyAppointments", { id: localStorage.getItem("UserId") }).then((res: any) => {
        this.items1 = res.Data;
      });
    }, 15000);
  }
  GotoHistory(itm) {
    console.log(itm);
  }
  EditAppointment(ev) {
    this.common.PageGoto('Forward', 'appointments', ev);
  }

  async OpenSucessCheckout(item) {
    let env = this;
    localStorage.setItem('SalonData', JSON.stringify(item.SalonData));
    localStorage.setItem('AppointmentData', JSON.stringify(item));
    this.common.GetMethod('StatusNotification?id=' + item.id);
    const custmodal = await this.modal.create({
      component: CheckoutreceiptPage,
      cssClass: 'checkoutreceipt',
      showBackdrop: true,
      componentProps: this.lists
    });
    await custmodal.present();
    let { data } = await custmodal.onWillDismiss();
    if (data.Status) {

      env.common.PostMethod("AppointmentStatus", { id: item.id, status: 'Checkout', cost: this.totalamount }).then((res: any) => {
        //  this.items1 = res.Data;

        if (res.Status == 1) {
          env.SavePaymentRecord(item.SalonData.b_id, 'cash', '', data.totalamount, item.id);
          env.common.presentToast("Appointment Checkout Successfull", 5000);
          env.ngOnInit();
        } else {
          env.common.presentToast("Appointment checkout failed, Please try again", 8000);
        }


      });


      //  let filename = rdata.data.filename + ".pdf";
      //   this.file.writeFile(this.file.externalRootDirectory + "MSZApp/", filename, rdata.data.Data, { replace: true }).then((result: any) => {
      //     this.social.share("Your Salon Receipt via-My Salon Zone", "Receipt", [this.file.externalRootDirectory + "MSZApp/" + filename], "");
      //   });

      // if (!this.lists.Old) {
      //   // this.checkoutform.reset();
      //   this.lists.serviceinfo = [];
      //   this.lists.employeeinfo = {};
      //   this.lists.PaymentMode = "";
      //   this.navCtrl.navigateBack('/tabs/dashboard');
      // } else {
      //   // this.checkoutform.reset();
      //   this.lists.serviceinfo = [];
      //   this.lists.employeeinfo = {};
      //   this.lists.PaymentMode = "";
      //   this.navCtrl.back();
      // }

    }
  }
  MakeInvoice() {
    this.common.presentLoader();
    this.externalDataRetrievedFromServer = [];
    this.lists.serviceinfo.forEach((element, index) => {
      this.externalDataRetrievedFromServer.push({ No: index + 1, Service: element.service, Price: element.serviceprice });
    });
    console.log(this.externalDataRetrievedFromServer);
    let today = new Date();
    let Profile = JSON.parse(localStorage.getItem("UserProfile"));

    let receiptname = this.splitname(Profile.Businessinfo.name);
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    var docDefinition = {
      content: [
        {
          columns: [
            {
              image: this.image,
              height: 100,
              width: 100
            },
            [
              { text: Profile.Businessinfo.name, style: 'header' },
              { text: Profile.Businessaddressinfo.address + "," + Profile.Businessaddressinfo.statename + "," + Profile.Businessaddressinfo.cityname + "-" + Profile.Businessaddressinfo.pincode, style: 'sub_header' },
              { text: '+91 ' + Profile.Businessinfo.mobileno, style: 'url' },
            ]
          ],

        },
        { text: "Receipt Date : " + moment(today).format("DD.MM.YYYY hh:mm a"), style: 'date' },
        { text: "Receipt No. : " + receiptname + "/" + moment(today).format("DD/MM/YYYY") + "/" + this.lists.billid, style: 'date' },
        { text: "Stylist Name : " + this.lists.employeeinfo.name },
        { text: "Customer Name : " + this.lists.customer_name },
        { text: 'Summary', style: 'statment', margin: [0, 10, 0, 10] },
        this.table(this.externalDataRetrievedFromServer, ['No', 'Service', 'Price']),
        {
          table: {
            widths: ['auto', 100],
            body: [
              ['Discount', this.lists.Discount + this.lists.DiscountType == 'Percent' ? ' %' : ' ₹'],
              ['Tax', '0%',],
              ['Total Amount', this.totalamount()]
            ],

          },
          alignment: 'right'
        }
      ],
      footer: {
        columns: [
          { text: 'Receipt Genrated by - My Salon Zone App', style: 'date', margin: [30, 0, 0, 0] }
        ]
      },
      styles: {
        header: {
          bold: true,
          fontSize: 16,
          alignment: 'right'
        },
        sub_header: {
          fontSize: 12,
          alignment: 'right'
        },
        url: {
          fontSize: 12,
          alignment: 'right'
        },
        statment: {
          bold: true,
          fontSize: 16,
          alignment: 'center'
        },
        date: {
          fontSize: 12,
          alignment: 'left'
        },
      },
      pageSize: 'A4',
      pageOrientation: 'portrait'
    };
    let binaryArray;
    pdfmake.createPdf(docDefinition).getBuffer(function (buffer) {
      let utf8 = new Uint8Array(buffer);
      binaryArray = utf8.buffer;
    });
    setTimeout(() => {
      this.common.dismissLoader();
      this.receiptData = { Status: true, Data: binaryArray, finish: false, Info: this.lists, filename: receiptname + "-" + moment(today).format("MM-YYYY") + "-" + this.lists.billid };
    }, 2000);
  }

  totalamount() {
    let total: any = 0;
    this.lists.serviceinfo.forEach(element => {
      total = parseInt(total) + parseInt(element.serviceprice);
    });
    return parseFloat(total);
  }
  buildTableBody(data, columns) {
    var body = [];
    body.push(columns);
    data.forEach(function (row) {
      var dataRow = [];
      columns.forEach(function (column) {
        dataRow.push(row[column].toString());
      })
      body.push(dataRow);
    });

    return body;
  }

  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        widths: [100, '*', '*'],
        body: this.buildTableBody(data, columns),

      },
      margin: [0, 10, 0, 10]
    };
  }

  splitname(ev) {
    let character = ev.split(" ");
    let name = "";
    character.forEach(element => {
      name += element.slice(0, 1);
    });
    return name;
  }


  async ChangeStatus(AppointData, StatusChange) {

    if (StatusChange == 'Cancelled') {


      let alert = await this.alertCtrl.create({
        message: 'Are you sure? do you want to cancel this appointment',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Ok',
            handler: () => {
              this.common.PostMethod("AppointmentStatus", { id: AppointData, status: StatusChange }).then((res: any) => {
                let Res = res;
                if (Res.Status == 1) {
                  this.common.presentToast("Appointment " + StatusChange + " Successfull", 8000);
                  this.ngOnInit();
                } else {
                  this.common.presentToast("Appointment is not updated, error occured", 8000);
                }
              });
            }
          }
        ]
      });
      await alert.present();

    } else {
      this.common.PostMethod("AppointmentStatus", { id: AppointData, status: StatusChange }).then((res: any) => {
        let Res = res;
        if (Res.Status == 1) {
          this.common.presentToast("Appointment " + StatusChange + " Successfull", 8000);
          this.ngOnInit();
        } else {
          this.common.presentToast("Appointment is not updated, error occured", 8000);
        }

      });
    }
  }


  SavePaymentRecord(Bid, type, transactionid, payment_value, appointment_id) {

    let UserProfile = JSON.parse(localStorage.getItem("UserProfile"));

    let DataSend = {
      user_id: UserProfile.id,
      b_id: Bid,
      type: type,
      transaction_id: transactionid,
      payment_value: payment_value,
      appointment_id: appointment_id
    }
    this.common.PostMethod("Post_Payment_Request", DataSend).then((res: any) => {
      let Res = res;
      if (Res.Status == 1) {

      } else {

      }

    });
  }


}
