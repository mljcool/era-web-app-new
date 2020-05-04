import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '@appCore/models/User';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientCheckerModalComponent implements OnInit {

  clientData: IUser;

  constructor(public matDialogRef: MatDialogRef<ClientCheckerModalComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any) {
    this.clientData = (_data || {}).userInfo;
    console.log(_data);
  }
  ngOnInit(): void { }
}
