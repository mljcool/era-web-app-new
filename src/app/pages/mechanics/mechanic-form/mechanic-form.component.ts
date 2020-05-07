import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mechanics } from '../mechanics.model';


@Component({
    selector: 'mechanics-form-dialog',
    templateUrl: './mechanic-form.component.html',
    styleUrls: ['./mechanic-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MechanicsFormDialogComponent {
    action: string;
    mechanics: Mechanics;
    contactForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<MechanicsFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<MechanicsFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Contact';
            this.mechanics = _data.mechanics;
        }
        else {
            this.dialogTitle = 'New Contact';
            this.mechanics = new Mechanics({});
        }

        this.contactForm = this.createContactForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create mechanics form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.mechanics.id],
            name: [this.mechanics.name],
            lastName: [this.mechanics.lastName],
            avatar: [this.mechanics.avatar],
            nickname: [this.mechanics.nickname],
            company: [this.mechanics.company],
            jobTitle: [this.mechanics.jobTitle],
            email: [this.mechanics.email],
            phone: [this.mechanics.phone],
            address: [this.mechanics.address],
            birthday: [this.mechanics.birthday],
            notes: [this.mechanics.notes]
        });
    }
}
