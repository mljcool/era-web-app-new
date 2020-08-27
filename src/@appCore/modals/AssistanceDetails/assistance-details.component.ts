import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '@appCore/services/client.service';
import { StoreServices } from '@appCore/services/store.services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAssistance } from '@appCore/models/assistance.model';
import { Router } from '@angular/router';
import { getAssistanceName } from '@appCore/utils/GetAssistanceServiceType';

@Component({
  selector: 'app-assistance-details',
  templateUrl: './assistance-details.component.html',
  styleUrls: ['./assistance-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AssistanceDetailsModalComponent implements OnInit {
  shopStatus: string = '';
  assistanceData: IAssistance;
  contactForm: FormGroup;
  clientData: any = {};

  constructor(
    public matDialogRef: MatDialogRef<AssistanceDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _clientSrvc: ClientService,
    private _StoreServices: StoreServices,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    const { clientData, assistanceTypeId } = this._data;
    const assistanceTypeName = getAssistanceName(assistanceTypeId);
    this.clientData = clientData;
    this.assistanceData = new IAssistance({
      ...clientData,
      assistanceTypeName,
      assistanceWrittenAddress: this._data.writtenAddress,
      notes: this._data.notes,
    });
    console.log('Coool1', this.assistanceData);
    console.log('Coool2', clientData);
    this.contactForm = this.createContactForm();
  }
  ngOnInit(): void {}

  onProceed() {
    this.matDialogRef.close();
    const proceedTo = setTimeout(() => {
      const { assistanceUId } = this._data;
      this._router.navigate(['/assistance-proceed'], { queryParams: { id: assistanceUId } });
      clearTimeout(proceedTo);
    }, 500);
  }

  createContactForm(): FormGroup {
    const name = (this.clientData || {}).name || (this.clientData || {}).displayName;
    console.log('Coool2', name);
    return this._formBuilder.group({
      id: [this.assistanceData.id],
      name: [name],
      email: [this.assistanceData.email],
      mobileNumber: [this.assistanceData.mobileNumber],
      assistanceTypeName: [this.assistanceData.assistanceTypeName],
      assistanceWrittenAddress: [this.assistanceData.assistanceWrittenAddress],
      notes: [this.assistanceData.notes],
    });
  }
}
