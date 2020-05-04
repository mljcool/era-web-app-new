import { ClientService } from '@appCore/services/client.service';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientCheckerModalComponent } from '@appCore/modals/checker/checker.component';

@Injectable()
export class CheckerServices {

  dialogRef: any;

  constructor(
    private _matDialog: MatDialog,
    private _clientSrvc: ClientService
  ) {
    console.info('checking client records.....');
    this._clientSrvc.onUserDataInfo.subscribe(response => {
      console.log(response);
      if (response.uid) {
        this.checkClienthasRegistration(response);
      }
    });
  }

  checkClienthasRegistration(userInfo: any) {
    this.dialogRef = this._matDialog.open(ClientCheckerModalComponent, {
      panelClass: 'checker-dialog',
      data: {
        userInfo,
        action: 'edit'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
      });

  }

}
