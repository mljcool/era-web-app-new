import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '@appCore/services/client.service';
import { StoreServices } from '@appCore/services/store.services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAssistance } from '@appCore/models/assistance.model';


export const assistTanceList = [
  {
    id: 1,
    label: 'Wheels and Tires',
  },
  {
    id: 2,
    label: 'Battery Inspection (Jump Start)',
  },
  {
    id: 3,
    label: 'Overheating',
  },
  {
    id: 4,
    label: 'Engine Inspection',
  },
  {
    id: 5,
    label: 'Towing',
  },
  {
    id: 6,
    label: 'Vehicle Lockout',
  },
  {
    id: 7,
    label: 'Fuel Delivery',
  },
  {
    id: 8,
    label: 'General Inspection',
  }
];



@Component({
  selector: 'app-assistance-details',
  templateUrl: './assistance-details.component.html',
  styleUrls: ['./assistance-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AssistanceDetailsModalComponent implements OnInit {


  shopStatus: string = '';
  contact: IAssistance;
  contactForm: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<AssistanceDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _clientSrvc: ClientService,
    private _StoreServices: StoreServices,
    private _formBuilder: FormBuilder
  ) {
    console.log('Coool', this._data);
    const { clientData, assistanceTypeId } = this._data;
    const assistanceTypeName = assistTanceList.find(service => service.id === assistanceTypeId).label;
    this.contact = new IAssistance({
      ...clientData,
      assistanceTypeName,
      assistanceWrittenAddress: this._data.writtenAddress,
      notes: this._data.notes
    });
    console.log(this.contact);
    this.contactForm = this.createContactForm();
  }
  ngOnInit(): void {

  }

  createContactForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.contact.id],
      name: [this.contact.name],
      email: [this.contact.email],
      mobileNumber: [this.contact.mobileNumber],
      assistanceTypeName: [this.contact.assistanceTypeName],
      assistanceWrittenAddress: [this.contact.assistanceWrittenAddress],
      notes: [this.contact.notes]
    });
  }

}
