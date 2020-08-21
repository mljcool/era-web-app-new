import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Marker } from '@appCore/models/Marker';
import { fuseAnimations } from '@fuse/animations';
import { StoreServices } from '@appCore/services/store.services';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-assistance=proceed',
  templateUrl: './assistance-proceed.component.html',
  styleUrls: ['./assistance-proceed.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AssistanceProceedComponent implements OnInit {
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

  constructor(
    private _matDialog: MatDialog,
    private _StoreServices: StoreServices) {

  }

  ngOnInit(): void {

  }

  getAllObservers() {

  }
}
