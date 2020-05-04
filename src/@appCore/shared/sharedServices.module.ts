import { FirebaseUIModule } from 'firebaseui-angular';

import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientService } from '@appCore/services/client.service';
import { CheckerServices } from '@appCore/services/checker.service';
import { StoreServices } from '@appCore/services/store.services';

@NgModule({
  imports: [
    CommonModule,


  ],
  exports: [
    CommonModule,
    FirebaseUIModule
  ]
})
export class ServicesSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesSharedModule,
      providers: [ClientService, CheckerServices, StoreServices],
    }
  }

}
