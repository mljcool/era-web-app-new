import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '@appCore/models/User';
import { ClientService } from '@appCore/services/client.service';
import { StoreServices } from '@appCore/services/store.services';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    displayName: './assets/images/avatars/avatar.jpg',
  };
  isReg: boolean = false;
  isLoad: boolean = false;
  contactForm: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<ClientCheckerModalComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _clientSrvc: ClientService,
    private _StoreServices: StoreServices,
    private _formBuilder: FormBuilder
  ) {
    this._clientSrvc.onUserDataInfo.subscribe((userData) => {
      this.clientData = userData;
    });
    this._StoreServices.onAutoShop.subscribe((response) => {
      setTimeout(() => {
        if (!!response.length && !!this.clientData.uid) {
          this.isReg = response.some(
            (data) => data.uid === this.clientData.uid
          );
          this.isLoad = true;
          if (this.isReg) {
            this.matDialogRef.close();
          }
        }
      }, 1000);
    });
    this.contactForm = this.createContactForm();
  }
  ngOnInit(): void { }

  createContactForm(): FormGroup {
    return this._formBuilder.group({
      id: [],
      name: [],
      lastName: [],
      avatar: [],
      nickname: [],
      company: [],
      jobTitle: [],
      email: [],
      phone: [],
      address: [],
      birthday: [],
      notes: [],
    });
  }
}
