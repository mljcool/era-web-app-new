
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { MechanicsFormDialogComponent } from './../mechanic-form/mechanic-form.component';
import { MechanicService } from '../mechanics.service';

@Component({
    selector: 'mechanic-list',
    templateUrl: './mechanic-list.component.html',
    styleUrls: ['./mechanic-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MechanicListComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContent', { static: true })
    dialogContent: TemplateRef<any>;

    mechanics: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['name', 'lastName', 'email', 'phone', 'jobTitle', 'status', 'buttons'];
    selectedContacts: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MechanicService} _mechanicSrvs
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _mechanicSrvs: MechanicService,
        public _matDialog: MatDialog
    ) {
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
        this.dataSource = new FilesDataSource(this._mechanicSrvs);

        this._mechanicSrvs.onContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(mechanics => {
                this.mechanics = mechanics;

                this.checkboxes = {};
                mechanics.map(contact => {
                    this.checkboxes[contact.id] = false;
                });
            });

        this._mechanicSrvs.onSelectedContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }

                    this.checkboxes[id] = selectedContacts.includes(id);
                }
                this.selectedContacts = selectedContacts;
            });

        this._mechanicSrvs.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });

        this._mechanicSrvs.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._mechanicSrvs.deselectContacts();
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
     * Edit contact
     *
     * @param contact
     */
    editContact(mechanics): void {
        this.dialogRef = this._matDialog.open(MechanicsFormDialogComponent, {
            panelClass: 'mechanic-form-dialog',
            data: {
                mechanics,
                action: 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    /**
                     * Save
                     */
                    case 'save':

                        this._mechanicSrvs.updateContact(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteContact(mechanics);

                        break;
                }
            });
    }

    /**
     * Delete Contact
     */
    deleteContact(contact): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._mechanicSrvs.deleteContact(contact);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * On selected change
     *
     * @param contactId
     */
    onSelectedChange(contactId): void {
        this._mechanicSrvs.toggleSelectedContact(contactId);
    }

    /**
     * Toggle star
     *
     * @param contactId
     */
    toggleStar(contactId): void {
        if (this.user.starred.includes(contactId)) {
            this.user.starred.splice(this.user.starred.indexOf(contactId), 1);
        }
        else {
            this.user.starred.push(contactId);
        }

        this._mechanicSrvs.updateUserData(this.user);
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {MechanicService} _mechanicSrvs
     */
    constructor(
        private _mechanicSrvs: MechanicService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._mechanicSrvs.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
