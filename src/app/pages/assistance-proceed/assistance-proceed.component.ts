import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Marker } from '@appCore/models/Marker';
import { fuseAnimations } from '@fuse/animations';
import { StoreServices } from '@appCore/services/store.services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getAssistanceDetails, getClientDetails, getShopDetails } from '@appCore/firebaseRef/FetchData';
import { getAssistanceName } from '@appCore/utils/GetAssistanceServiceType';
import { AccommodateAssistanceModalComponent } from '@appCore/modals/AccommoDateAssistance/accommodate-assistance.component';

@Component({
  selector: 'app-assistance=proceed',
  templateUrl: './assistance-proceed.component.html',
  styleUrls: ['./assistance-proceed.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AssistanceProceedComponent implements OnInit {
  public origin: any;
  public destination: any;
  public renderOptions = {
    suppressMarkers: true,
  };
  widgets: any;
  dialogRef: any;
  latitude = 7.0514;
  longitude = 125.594772;

  markerOptions = {
    origin: {
      icon: {
        url: 'assets/images/svg/guage.svg',
        scaledSize: {
          height: 50,
          width: 40,
        },
      },
    },
    destination: {
      icon: {
        url: 'assets/images/svg/my-marker.svg',
        scaledSize: {
          height: 50,
          width: 40,
        },
      },
    },
  };

  getShopDetails: any = '';
  getAssistanceName: any = '';
  assistanceDetails: any = {
    dateCreated: {
      toDate: () => {
        return new Date();
      },
    },
    status: 'PENDING',
  };
  clientDetails: any = {
    address: {
      formattedAddres: '',
    },
  };
  private _unsubscribeAll: Subject<any>;

  constructor(private route: ActivatedRoute, private _matDialog: MatDialog) {
    this._unsubscribeAll = new Subject();
    this.route.queryParams.pipe(takeUntil(this._unsubscribeAll)).subscribe((params) => {
      const { id } = params;
      this.getAllDetails(id);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  getAllDetails(id): void {
    getAssistanceDetails(id).onSnapshot((snapshot) => {
      const assistance: any = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }))[0];

      const { userId, shopId } = assistance;

      this.assistanceDetails = { ...this.assistanceDetails, ...assistance };
      this.getAssistanceName = getAssistanceName(assistance.assistanceTypeId);

      console.log('assistance', assistance);
      getClientDetails(userId).onSnapshot((snapshot) => {
        const clientDetail: any = snapshot.docs.map((client) => ({
          key: client.id,
          ...client.data(),
        }))[0];
        this.clientDetails = { ...this.clientDetails, ...clientDetail };
        console.log('clientDetail', clientDetail);
      });

      getShopDetails(shopId).onSnapshot((snapshot) => {
        const getShopDetails: any = snapshot.docs.map((client) => ({
          key: client.id,
          ...client.data(),
        }))[0];
        this.getShopDetails = { ...this.getShopDetails, ...getShopDetails };
        this.setLocations();
      });
    });
  }

  setLocations() {
    const { userLocation = {} } = this.assistanceDetails;
    const { shopLocation = {} } = this.getShopDetails;
    this.destination = {
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    };
    this.origin = {
      lat: shopLocation.latitude,
      lng: shopLocation.longitude,
    };
  }

  onAccommodate(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'assistance-accommodate-dialog';
    dialogConfig.data = {};

    this.dialogRef = this._matDialog.open(AccommodateAssistanceModalComponent, dialogConfig);
  }
}
