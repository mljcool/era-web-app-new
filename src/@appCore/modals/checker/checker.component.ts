import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '@appCore/models/User';
import { ClientService } from '@appCore/services/client.service';
import { StoreServices } from '@appCore/services/store.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudServiceShop } from '@appCore/services/crud.shop';
import { firebase } from '@appCore/firebase/firebase-config';
import * as moment from 'moment';
import Swal from 'sweetalert2';

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
  isSaving: boolean = false;
  contactForm: FormGroup;
  shopLocation: any = {};
  private fgn: String;
  
  shopStatus: string ='';

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
      const statuses:string[] = ['REJECTED', 'PENDING'];
      setTimeout(() => {
        if (!!(response|| {}).uid) {
          this.shopStatus = response.status;
          this.isReg = true;
          this.isLoad = true;
          if (this.isReg && !statuses.includes( response.status)) {
            this.matDialogRef.close();
          }
        }else {
          this.isLoad = true;
          this.isReg = false;
        }
      }, 1000);
    });
    this.contactForm = this.createContactForm();
  }
  ngOnInit(): void { }

  createContactForm(): FormGroup {
    const phone = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$';
    const mobilePattern = '^((\\+91-?)|0)?[0-9]{10}$';
    const urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    return this._formBuilder.group({
      name: ['', Validators.required],
      secondName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(mobilePattern)]],
      phone: ['', [Validators.required, Validators.pattern(phone)]],
      email: ['', [Validators.required, Validators.email]],
      domain: ['', [Validators.required, Validators.pattern(urlPattern)]],
      founded: ['', Validators.required],
      address: ['', Validators.required],
      notes: [],
    });
  }

  patchValuesHere(data) {
    this.contactForm.patchValue({ address: data });
  }

  onSave(): void {
    this.isSaving = true;
    const formData = this.contactForm.getRawValue();
    formData.uid = this.clientData.uid;
    formData.status = 'PENDING';
    formData.founded = moment(formData.founded).format('dddd, MMMM Do YYYY');
    formData.dateCreated = firebase.firestore.Timestamp.fromDate(new Date());
    formData.shopLocation = this.shopLocation;

    setTimeout(() => {
      this._CrudServiceShop.insertNewShop(formData).then(() => {
        Swal.fire('Good job!', 'Submission completed!', 'success');
        this.isSaving = false;
      })
    }, 1000)


  }

  handleAddressChange(googleProps: any) {
    this.contactForm.patchValue({ address: googleProps.formatted_address });
    const { location } = googleProps.geometry;
    this.shopLocation = {
      latitude: location.lat(),
      longitude: location.lng(),
    };
  }
}
