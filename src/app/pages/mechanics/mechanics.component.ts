import { MechanicsFormDialogComponent } from './mechanic-form/mechanic-form.component';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MechanicService } from './mechanics.service';
import { firebase } from '@appCore/firebase/firebase-config';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mechanics',
  templateUrl: './mechanics.component.html',
  styleUrls: ['./mechanics.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MechanicsComponent implements OnInit, OnDestroy {
  dialogRef: any;
  hasSelectedContacts: boolean;
  searchInput: FormControl;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {MechanicService} _contactsService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {MatDialog} _matDialog
   */
  constructor(
    private _contactsService: MechanicService,
    private _fuseSidebarService: FuseSidebarService,
    private _matDialog: MatDialog
  ) {
    // Set the defaults
    this.searchInput = new FormControl('');

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._contactsService.onSelectedContactsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectedContacts => {
        this.hasSelectedContacts = selectedContacts.length > 0;
      });

    this.searchInput.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        this._contactsService.onSearchTextChanged.next(searchText);
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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * New contact
   */
  newContact(): void {
    this.dialogRef = this._matDialog.open(MechanicsFormDialogComponent, {
      panelClass: 'mechanic-form-dialog',
      data: {
        action: 'new'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
        if (!response) {
          return;
        }

        const personnelData = response.getRawValue();
        personnelData.shopuid = localStorage.getItem('shopId');
        personnelData.founded = moment(personnelData.founded).format('MM-DD-YYYY');
        personnelData.dateCreated = firebase.firestore.Timestamp.fromDate(new Date());

        this._contactsService.insertNewMechanics(personnelData).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Personnel Data has been saved',
            showConfirmButton: false,
            timer: 1500
          })


        });
      });
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}
