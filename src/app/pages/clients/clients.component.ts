import { ClientService } from './../../../@appCore/services/client.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-clients',
  template: `
    <p>
      clients works!
    </p>
  `,
  styles: [
  ]
})
export class ClientsComponent implements OnInit, OnDestroy {

  constructor(private _clientSrvc: ClientService) {
  }
  ngOnInit(): void {
    this._clientSrvc.onUserChanges.subscribe(response => {
      console.log(response);
    }).unsubscribe();
  }


  ngOnDestroy(): void {
    console.log('here');
  }


}
