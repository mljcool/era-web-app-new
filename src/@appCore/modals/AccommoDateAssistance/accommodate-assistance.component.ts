import { Component, ViewEncapsulation, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '@appCore/services/client.service';
import { StoreServices } from '@appCore/services/store.services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAssistance } from '@appCore/models/assistance.model';
import { Router } from '@angular/router';
import { getAssistanceName } from '@appCore/utils/GetAssistanceServiceType';
import { Mechanics } from 'app/pages/mechanics/mechanics.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-accommodate-assistanc',
  templateUrl: './accommodate-assistance.component.html',
  styleUrls: ['./accommodate-assistance.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccommodateAssistanceModalComponent implements OnInit {
  shopStatus: string = '';
  pageType: string = '';
  assistanceTypeName: string = '';
  assistanceData: IAssistance;
  contactForm: FormGroup;
  servicePersonnel: Mechanics[] = [];
  selectable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredPersonnels: Observable<Mechanics[]>;
  allPersonnel: Mechanics[] = [];

  @ViewChild('personnelInput') personnelInput: ElementRef<HTMLInputElement>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    public matDialogRef: MatDialogRef<AccommodateAssistanceModalComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _clientSrvc: ClientService,
    private _StoreServices: StoreServices,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    console.log('AccommodateAssistanceModalComponent', this._data);
    this._unsubscribeAll = new Subject();

    const { assistanceTypeId } = this._data;
    this.assistanceTypeName = getAssistanceName(assistanceTypeId);
    this.contactForm = this.createContactForm();
  }

  ngOnInit(): void {
    this.filteredPersonnels = this.contactForm
      .get('personnels')
      .valueChanges.pipe(
        startWith(null),
        map((personnel: Mechanics | null) =>
          (personnel || {}).id ? this._filterPersonnel(personnel.id) : this.allPersonnel.slice()
        )
      )
      .pipe(takeUntil(this._unsubscribeAll));
    this.getAllPersonnel();
  }

  private _filterPersonnel(value: string): Mechanics[] {
    return this.allPersonnel.filter((personnel) => personnel.name === value || personnel.lastName === value);
  }

  onProceed() {
    const newList = this.servicePersonnel.map(({ id }) => ({ id }));

    this.matDialogRef.close({
      data: this.contactForm.getRawValue(),
      personnels: newList,
    });
  }

  createContactForm(): FormGroup {
    const { costNotes, costAmount, timeType, timeValue, mechanicId } = this._data.dataForm;

    return this._formBuilder.group({
      id: [''],
      personnels: [mechanicId],
      assistanceTypeName: [this.assistanceTypeName],
      assistanceCost: [costAmount],
      assistanceTimeEstimate: [''],
      timeType: [timeType],
      timeValue: [timeValue],
      notes: [costNotes],
    });
  }

  removePersonnel(personnel: Mechanics): void {
    const index = this.servicePersonnel.indexOf(personnel);

    if (index >= 0) {
      this.servicePersonnel.splice(index, 1);
    }
  }
  selectedPersonnel(event: MatAutocompleteSelectedEvent): void {
    if ((event.option.viewValue || '').trim()) {
      let index = this.servicePersonnel.indexOf(event.option.value);
      if (index == -1) this.servicePersonnel.push(event.option.value);
    }

    this.personnelInput.nativeElement.value = '';
    this.contactForm.get('personnels').setValue({ personnels: null });
  }

  getAllPersonnel(personnel = []): void {
    this._StoreServices.onMechanicsAutoShop.pipe(takeUntil(this._unsubscribeAll)).subscribe((response) => {
      if (response && response.length) {
        this.allPersonnel = response;
        if (this.pageType === 'new') {
          this.servicePersonnel.push(response[0]);
        } else {
          response.forEach((element) => {
            const isFound = personnel.filter((data) => data.id === element.id);
            if (isFound.length) {
              this.servicePersonnel.push(element);
            }
          });
        }
      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
