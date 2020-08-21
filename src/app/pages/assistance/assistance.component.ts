import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Marker } from '@appCore/models/Marker';
import { fuseAnimations } from '@fuse/animations';
import { AssistanceServices } from './assistance.service';
import { StoreServices } from '@appCore/services/store.services';
import { takeUntil, map } from 'rxjs/operators';
import { Subject, zip } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AssistanceDetailsModalComponent } from '@appCore/modals/AssistanceDetails/assistance-details.component';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AssistanceComponent implements OnInit, OnDestroy {
  widgets: any;
  dialogRef: any;
  latitude = 7.0514;
  longitude = 125.594772;
  markers: Marker[] = [];
  myLocations = {
    iconUrl: {
      url: 'assets/img/markers/marker-shop.png',
      scaledSize: {
        height: 50,
        width: 40,
      },
    },
  };

  userIcon = {
    url: 'assets/svg/my-marker.svg',
    scaledSize: {
      height: 70,
      width: 60,
    },
  };

  allAssistance: any[] = [];
  allClients: any[] = [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _assistanceServices: AssistanceServices,
    private _matDialog: MatDialog,
    private _StoreServices: StoreServices) {
    this._unsubscribeAll = new Subject();

  }

  ngOnInit(): void {
    this._assistanceServices.getAssistance().then((response) => {
      console.log('cool', response);
      this.getAllObservers();
    });
  }

  getAllObservers() {
    const onAllAssistance$ = this._StoreServices.onAllAssistance;
    const onAllClients$ = this._StoreServices.onAllClients;

    zip(onAllAssistance$, onAllClients$)
      .pipe(
        takeUntil(this._unsubscribeAll),
        map(([onAllAssistance$, onAllClients$]) => ({
          onAllAssistance$,
          onAllClients$,
        }))
      )
      .subscribe((observers) => {
        const { onAllAssistance$, onAllClients$ } = observers;
        console.log('observers$', observers);
        console.log('onAllAssistance$', onAllAssistance$);
        console.log('onAllClients$', onAllClients$);
        this.allAssistance = onAllAssistance$.map((data) => {
          data.iconUrl = this.userIcon;
          return data;
        });
        this.allClients = onAllClients$;
      });
  }

  viewAssistancetails(data): void {
    const dialogConfig = new MatDialogConfig();
    const getClientData = this.allClients.find(client => client.id === data.userId);

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'assistance-details-dialog';
    dialogConfig.data = {
      ...data,
      clientData: getClientData
    }

    this.dialogRef = this._matDialog.open(AssistanceDetailsModalComponent, dialogConfig);
  }

  ngOnDestroy(): void { }

  onPending(): void {
    console.log('onPending');
  }

  onInprogress(): void {
    console.log('onInprogress');
  }

  onDone(): void {
    console.log('onDone');
  }
}
