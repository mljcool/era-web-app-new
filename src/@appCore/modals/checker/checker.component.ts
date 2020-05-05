import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '@appCore/models/User';
import { ClientService } from '@appCore/services/client.service';
import { StoreServices } from '@appCore/services/store.services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudServiceShop } from '@appCore/services/crud.shop';
import { firebase } from '@appCore/firebase/firebase-config';
import * as moment from 'moment';
import Swal from 'sweetalert2'

import LatLng = google.maps.LatLng;
import { LocationPickerModule } from "ng-location-picker";






@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CrudServiceShop],
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
    private _formBuilder: FormBuilder,
    private _CrudServiceShop: CrudServiceShop
  ) {
    this._clientSrvc.onUserDataInfo.subscribe((userData) => {
      this.clientData = userData;
    });
    this._StoreServices.onAutoShop.subscribe((response) => {
      setTimeout(() => {
        if (!!response.length && !!this.clientData.uid) {
          this.isReg = response.some((data) => data.uid === this.clientData.uid);
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
      name: [],
      secondName: [],
      mobile: [],
      phone: [],
      email: [],
      domain: [],
      founded: [],
      address: [],
      notes: [],
    });
  }

  onSave(): void {
    const formData = this.contactForm.getRawValue();
    formData.uid = this.clientData.uid;
    formData.status = 'PENDING';
    formData.founded = moment(formData.founded).format('dddd, MMMM Do YYYY');
    formData.dateCreated = firebase.firestore.Timestamp.fromDate(new Date());
    Swal.fire('Good job!', 'Submission completed!', 'success');

    console.log(formData);
    // this._CrudServiceShop.insertNewShop(formData).then(() => {

    // })
  }

  handleAddressChange(location: any) {
    console.log(location);
  }
}
