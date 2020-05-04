import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '@appCore/models/User';
import { ClientService } from '@appCore/services/client.service';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientCheckerModalComponent implements OnInit {

  clientData: IUser = {
    uid: '',
    photoURL: 'Loading....',
    displayName: './assets/images/avatars/avatar.jpg'
  };

  constructor(public matDialogRef: MatDialogRef<ClientCheckerModalComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any, private _clientSrvc: ClientService) {

    this._clientSrvc.onUserDataInfo.subscribe(userData => {
      this.clientData = userData;
    });
  }
  ngOnInit(): void { }
}
