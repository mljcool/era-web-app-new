import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'clients',
    loadChildren: () =>
      import('./pages/clients/clients.module').then(
        (m) => m.ClientsModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'assistance',
    loadChildren: () =>
      import('./pages/assistance/assistance.module').then(
        (m) => m.AssistanceModule
      ),
  },
  {
    path: 'assistance-proceed',
    loadChildren: () =>
      import('./pages/assistance-proceed/assistance-proceed.module').then(
        (m) => m.AssistanceProceedModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./pages/orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./pages/appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
  },
  {
    path: 'shopservices',
    loadChildren: () =>
      import('./pages/shopservices/shopservices.module').then(
        (m) => m.ShopservicesModule
      ),
  },
  {
    path: 'mechanics',
    loadChildren: () =>
      import('./pages/mechanics/mechanics.module').then(
        (m) => m.MechanicsModule
      ),
  },
  {
    path: 'progress',
    loadChildren: () =>
      import('./pages/progress/progress.module').then(
        (m) => m.ProgressModule
      ),
  },
  { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
