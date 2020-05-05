import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Marker } from '@appCore/models/Marker';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AssistanceComponent implements OnInit, OnDestroy {

  widgets: any;
  dialogRef: any;
  latitude = 7.0514;
  longitude = 125.594772;
  markers: Marker[] = [];
  myLocations = {
    iconUrl: {
      url: "assets/img/markers/marker-shop.png",
      scaledSize: {
        height: 50,
        width: 40
      }
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}
