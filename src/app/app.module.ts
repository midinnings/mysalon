import { AppointmenttimestatusPage } from './Modal/appointmenttimestatus/appointmenttimestatus.page';
import { SharingpopPage } from './Modal/sharingpop/sharingpop.page';
import { PasswordresetPage } from './Modal/passwordreset/passwordreset.page';
import { CuponsPage } from './Extra/cupons/cupons.page';
import { CancelappointmentPage } from './Modal/cancelappointment/cancelappointment.page';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from './Modal/modal/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OtpPage } from './Modal/otp/otp.page';
import { Camera } from '@ionic-native/Camera/ngx';
//import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NgOtpInputModule } from 'ng-otp-input';
//import { SMS } from '@ionic-native/sms/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CheckoutreceiptPage } from './Modal/checkoutreceipt/checkoutreceipt.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { PipeModule } from './Pipes/pipe/pipe.module';
import { BookingConfirmPage } from './Modal/booking-confirm/booking-confirm.page';
import { SalonTimingPage } from './Modal/salontiming/salontiming.page';
import { StarRatingModule } from 'ionic4-star-rating';
import { RefferalPage } from './modal/refferal/refferal.page';
import { ReviewPage } from './Modal/review/review.page';
import { InviteFriendsPage } from './Modal/invite-friends/invite-friends.page';
import { PaymentHistoryPage } from './Modal/payment-history/payment-history.page';
import { PointsHistoryPage } from './Modal/points-history/points-history.page';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { OfferDetailsPage } from './Modal/offer-details/offer-details.page';


@NgModule({
  declarations: [  OfferDetailsPage,AppComponent, PaymentHistoryPage, PointsHistoryPage, InviteFriendsPage, RefferalPage, ReviewPage, OtpPage, BookingConfirmPage, CancelappointmentPage, CheckoutreceiptPage, CuponsPage, SalonTimingPage, PasswordresetPage, SharingpopPage, AppointmenttimestatusPage],
  entryComponents: [  OfferDetailsPage,OtpPage, PaymentHistoryPage, PointsHistoryPage, InviteFriendsPage, RefferalPage, ReviewPage, BookingConfirmPage, CancelappointmentPage, CheckoutreceiptPage, CuponsPage, SalonTimingPage, PasswordresetPage, SharingpopPage, AppointmenttimestatusPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MaterialModule, HttpClientModule,
    ModalModule,
    PipeModule,
    FormsModule,
    NgOtpInputModule,
    ReactiveFormsModule,
    Ionic4DatepickerModule,
    OwlDateTimeModule,
    StarRatingModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    Camera,
   // File,
   // SMS,
    SocialSharing,
    Diagnostic,
    FileOpener,
    Geolocation,
    FirebaseMessaging,
    Contacts,
    Deeplinks,
    InAppBrowser,
    LaunchNavigator,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
