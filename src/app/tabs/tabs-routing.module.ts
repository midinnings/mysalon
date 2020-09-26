import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { DashboardPage } from '../Menu/dashboard/dashboard.page';
// import { AuthguardService2 } from './service/authguard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [{
      path: '',
      redirectTo: '/tabs/dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '',
          loadChildren: () => import('../Menu/dashboard/dashboard.module').then(m => m.DashboardPageModule),
        }
      ]
    },
    {
      path: 'checkout',
      children: [
        {
          path: '',
          loadChildren: () => import('../Menu/wallet/wallet.module').then(m => m.CheckoutPageModule)
        },
      ]
    },
    {
      path: 'job',
      children: [
        {
          path: '',
          loadChildren: () =>
            import('../Menu/history/history.module').then(m => m.JobsPageModule)
        }
      ]
    },
    {
      path: 'featured-dashboard',
      children: [
        {
          path: '',
          loadChildren: () =>
            import('../Menu/featured-dashboard/featured-dashboard.module').then(m => m.FeaturedDashboardPageModule)
        }
      ]
    },
    {
      path: 'employer',
      children: [
        {
          path: '',
          loadChildren: () =>
            import('../Menu/salon-list/salon-list.module').then(m => m.EmployerPageModule)
        }
      ]
    },
    {
      path: 'profile',
      children: [
        {
          path: '',
          loadChildren: () =>
            import('../Menu/profile/profile.module').then(m => m.ProfilePageModule)
        }
      ]
    },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
