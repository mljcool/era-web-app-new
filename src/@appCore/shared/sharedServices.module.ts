
import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientService } from '@appCore/services/client.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
  ]
})
export class ServicesSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesSharedModule,
      providers: [ClientService]
    }
  }

}
