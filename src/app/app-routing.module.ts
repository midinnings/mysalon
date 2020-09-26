import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './service/authguard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'login', loadChildren: './User/login/login.module#LoginPageModule' },
  { path: 'forgot', loadChildren: './User/forgot/forgot.module#ForgotPageModule' },
  { path: 'register', loadChildren: './User/register/register.module#RegisterPageModule' },
  { path: 'otp', loadChildren: './Modal/otp/otp.module#OtpPageModule' },
  {
    path: 'appointments',
    loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./Extra/event/event.module').then(m => m.EventPageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./Extra/offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'cancelappointment',
    loadChildren: () => import('./Modal/cancelappointment/cancelappointment.module').then( m => m.CancelappointmentPageModule)
  },
  
  {
    path: 'news',
    loadChildren: () => import('./Extra/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'endetails',
    loadChildren: () => import('./Extra/endetails/endetails.module').then( m => m.EndetailsPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./Extra/report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./Extra/blog/blog.module').then( m => m.BlogPageModule)
  },
  {
    path: 'blogdetail',
    loadChildren: () => import('./Extra/blogdetail/blogdetail.module').then( m => m.BlogdetailPageModule)
  },
  {
    path: 'newsdetails',
    loadChildren: () => import('./Extra/newsdetails/newsdetails.module').then( m => m.NewsdetailsPageModule)
  },
  {
    path: 'checkoutreceipt',
    loadChildren: () => import('./Modal/checkoutreceipt/checkoutreceipt.module').then( m => m.CheckoutreceiptPageModule)
  },
  {
    path: 'cupons',
    loadChildren: () => import('./Extra/cupons/cupons.module').then( m => m.CuponsPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./Extra/services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'passwordreset',
    loadChildren: () => import('./Modal/passwordreset/passwordreset.module').then( m => m.PasswordresetPageModule)
  },
  {
    path: 'sharingpop',
    loadChildren: () => import('./Modal/sharingpop/sharingpop.module').then( m => m.SharingpopPageModule)
  },
  {
    path: 'mapmaker',
    loadChildren: () => import('./User/mapmaker/mapmaker.module').then( m => m.MapmakerPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./Extra/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./More/aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'vision',
    loadChildren: () => import('./More/vision/vision.module').then( m => m.VisionPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./More/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./More/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./More/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./More/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'disclaimer',
    loadChildren: () => import('./More/disclaimer/disclaimer.module').then( m => m.DisclaimerPageModule)
  },
  {
    path: 'appointmenttimestatus',
    loadChildren: () => import('./Modal/appointmenttimestatus/appointmenttimestatus.module').then( m => m.AppointmenttimestatusPageModule)
  },
  {
    path: 'salon-details',
    loadChildren: () => import('./appointments/salon-details/salon-details.module').then( m => m.SalonDetailsPageModule)
  },
  {
    path: 'preffered-salon',
    loadChildren: () => import('./user/preffered-salon/preffered-salon.module').then( m => m.PrefferedSalonPageModule)
  },
  {
    path: 'refferal',
    loadChildren: () => import('./modal/refferal/refferal.module').then( m => m.RefferalPageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./Modal/review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./user/update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },
  {
    path: 'invite-friends',
    loadChildren: () => import('./Modal/invite-friends/invite-friends.module').then( m => m.InviteFriendsPageModule)
  },
  {
    path: 'points-history',
    loadChildren: () => import('./Modal/points-history/points-history.module').then( m => m.PointsHistoryPageModule)
  },
  {
    path: 'payment-history',
    loadChildren: () => import('./Modal/payment-history/payment-history.module').then( m => m.PaymentHistoryPageModule)
  },
  {
    path: 'offer-details',
    loadChildren: () => import('./Modal/offer-details/offer-details.module').then( m => m.OfferDetailsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
