import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Marker } from '@appCore/models/Marker';
import { fuseAnimations } from '@fuse/animations';
import { AssistanceServices } from './assistance.service';
import { StoreServices } from '@appCore/services/store.services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _assistanceServices: AssistanceServices,
    private _StoreServices: StoreServices) {
    this._unsubscribeAll = new Subject();
    this._StoreServices.onAllAssistance
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((assistance) => {
        this.allAssistance = assistance.map((data) => {
          data.iconUrl = this.userIcon;
          return data;
        });
        console.log('allAssistance', this.allAssistance);
      });
  }

  ngOnInit(): void {
    this._assistanceServices.getAssistance().then((response) => {
      console.log('cool', response);
    });
  }

  viewAssistancetails(data): void {

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
