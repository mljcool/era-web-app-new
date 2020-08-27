import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Marker } from '@appCore/models/Marker';
import { fuseAnimations } from '@fuse/animations';
import { AssistanceServices } from './assistance.service';
import { StoreServices } from '@appCore/services/store.services';
import { takeUntil, map } from 'rxjs/operators';
import { Subject, zip } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AssistanceDetailsModalComponent } from '@appCore/modals/AssistanceDetails/assistance-details.component';
import { myLocationsMarker, inprogressMarkerNew, userIconMarker, doneMarkerNew } from './assistance-marker';

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

  myLocations = myLocationsMarker;
  userIcon = userIconMarker;
  inprogressMarker = inprogressMarkerNew;
  doneMarker = doneMarkerNew;

  allAssistance: any[] = [];
  assistancePlaceHolder: any[] = [];
  allClients: any[] = [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _assistanceServices: AssistanceServices,
    private _matDialog: MatDialog,
    private _StoreServices: StoreServices
  ) {
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
        const getAssistance = onAllAssistance$.map((data) => {
          if (data.status === 'PENDING') {
            data.iconUrl = this.userIcon;
          } else if (data.status === 'IN-PROGRESS') {
            data.iconUrl = this.inprogressMarker;
          } else if (data.status === 'DONE') {
            data.iconUrl = this.doneMarker;
          }
          return data;
        });
        this.allAssistance = getAssistance.filter((show) => show.status === 'PENDING');
        this.allClients = onAllClients$;
        this.assistancePlaceHolder = getAssistance;
      });
  }

  viewAssistancetails(data): void {
    const dialogConfig = new MatDialogConfig();
    const getClientData = this.allClients.find((client) => client.id === data.userId);
    console.log('getClientData', getClientData);
    console.log('data', data);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'assistance-details-dialog';
    dialogConfig.data = {
      ...data,
      clientData: getClientData,
    };

    this.dialogRef = this._matDialog.open(AssistanceDetailsModalComponent, dialogConfig);
  }

  ngOnDestroy(): void {}

  onPending(): void {
    console.log('onPending');
    console.log('this.allAssistance', this.allAssistance);
    this.allAssistance = this.assistancePlaceHolder;
    this.allAssistance = this.allAssistance.filter((assistance) => assistance.status === 'PENDING');
    console.log('this.allAssistance', this.allAssistance);
  }

  onInprogress(): void {
    console.log('this.allAssistance', this.allAssistance);
    this.allAssistance = this.assistancePlaceHolder;
    this.allAssistance = this.allAssistance.filter((assistance) => assistance.status === 'IN-PROGRESS');
    console.log('this.allAssistance', this.allAssistance);
  }

  onDone(): void {
    console.log('onDone');
    console.log('this.allAssistance', this.allAssistance);
    this.allAssistance = this.assistancePlaceHolder;
    this.allAssistance = this.allAssistance.filter((assistance) => assistance.status === 'DONE');
    console.log('this.allAssistance', this.allAssistance);
  }
}
