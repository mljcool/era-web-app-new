import { ClientService } from '@appCore/services/client.service';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClientCheckerModalComponent } from '@appCore/modals/checker/checker.component';

@Injectable()
export class CheckerServices {

  dialogRef: any;

  constructor(
    private _matDialog: MatDialog,

  ) {
    console.info('checking client records.....');

  }

  checkClienthasRegistration(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'checker-dialog';


    this.dialogRef = this._matDialog.open(ClientCheckerModalComponent, dialogConfig);

    this.dialogRef.afterClosed()
      .subscribe(response => {

        if (!response) {
          return;
        }
      });

  }

}
