import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Marker } from '@appCore/models/Marker';
import { fuseAnimations } from '@fuse/animations';
import { StoreServices } from '@appCore/services/store.services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  getAssistanceDetails,
  getClientDetails,
  getShopDetails,
  updateAssistance,
  getMechanic,
  updateTimeAssistance,
  getClientCar,
} from '@appCore/firebaseRef/ProceedAssistanceRef';
import { getAssistanceName } from '@appCore/utils/GetAssistanceServiceType';
import { AccommodateAssistanceModalComponent } from '@appCore/modals/AccommoDateAssistance/accommodate-assistance.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { minsToHrs } from '@appCore/utils/ConvertHrstoMins';
import { calculateDistanceNearest } from '@appCore/utils/DirectionService';

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

  intervalHandle: any = null;
  getShopDetails: any = '';
  getAssistanceName: any = '';
  getMechanicDetails: any = '';
  clientCar: any = {};
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
    imageUrl: 'assets/images/avatars/profile.jpg',
  };
  private _unsubscribeAll: Subject<any>;

  time: any = '00:00';
  getApproximate = {
    distanceKM: '',
    esitamteTravelTime: '',
    writtenAddress: '',
  };

  fuelType = [
    {
      value: 'G',
      label: 'Gasoline',
    },
    {
      value: 'D',
      label: 'Diesel',
    },
    {
      value: 'E',
      label: 'Ethanol',
    },
    {
      value: 'LP',
      label: 'liquified Petroleum',
    },
    {
      value: 'BD',
      label: 'Bio-diesel',
    },
    {
      value: 'CNG',
      label: 'Compressed Natural Gas',
    },
  ];

  constructor(private route: ActivatedRoute, private _matDialog: MatDialog, private _matSnackBar: MatSnackBar) {
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

      const { userId, shopId, mechanicId, timeType, timeValue } = assistance;

      this.assistanceDetails = { ...this.assistanceDetails, ...assistance };
      this.getAssistanceName = getAssistanceName(assistance.assistanceTypeId);

      this.getMechanicData(mechanicId);
      clearInterval(this.intervalHandle);
      this.runningTime({ timeType, timeValue });

      getClientCar(userId).onSnapshot((snapshot) => {
        this.clientCar = snapshot.docs
          .map((client) => ({
            key: client.id,
            ...client.data(),
          }))
          .find((car: any) => car.insUsed);
        this.clientCar.fuelName = this.fuelType.find((fuel) => fuel.value === this.clientCar.fuelType).label;
        console.log('getClientCar', this.clientCar);
      });

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

  getMechanicData(mechanicId) {
    console.log('mechanicId', this.getShopDetails);
    console.log('mechanicId', mechanicId);
    if (!mechanicId) {
      return;
    }
    getMechanic(mechanicId).onSnapshot((snapshot) => {
      const getMechanicDetails: any = snapshot.docs.map((client) => ({
        key: client.id,
        ...client.data(),
      }))[0];
      this.getMechanicDetails = { ...this.getMechanicDetails, ...getMechanicDetails };
      console.log('getMechanicDetails', getMechanicDetails);
    });
  }

  runningTime({ timeType = '', timeValue }): void {
    console.log('timeType', timeType);
    console.log('timeValue', timeValue);

    let secondsRemaining;

    let minutes = 0;
    if (timeType === 'Hours') {
      minutes = minsToHrs(timeValue);
    } else {
      minutes = parseInt(timeValue);
    }

    const tick = () => {
      // grab the h1
      // turn the seconds into mm:ss
      let min = Math.floor(secondsRemaining / 60);
      let sec: any = secondsRemaining - min * 60;

      //add a leading zero (as a string value) if seconds less than 10
      if (sec < 10) {
        sec = '0' + sec;
      }
      // concatenate with colon
      let message = min.toString() + ':' + sec;
      this.time = message;
      // now change the display

      // stop is down to zero
      if (secondsRemaining === 0) {
        this.time = 'Arrived!';
        clearInterval(this.intervalHandle);
        this.updateTime();
      }

      //subtract from seconds remaining
      secondsRemaining--;
    };

    // check if not a number
    if (isNaN(minutes)) {
      console.log('invalid time type');
      return; // stops function if true
    }
    // how many seconds
    secondsRemaining = minutes * 60;

    this.intervalHandle = setInterval(tick, 1000);
  }

  updateTime(): void {
    const { key } = this.assistanceDetails;
    updateTimeAssistance(key).then(() => {
      this._matSnackBar.open('Arrived..', 'OK', {
        verticalPosition: 'top',
        duration: 2000,
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
    calculateDistanceNearest(this.origin, this.destination).then((result: any) => {
      if (result) {
        console.log('getApproximate', result);
        this.getApproximate = { ...this.getApproximate, ...result };
      }
    });
  }

  forceArrived() {
    this.updateTime();
  }

  onAccommodate(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'assistance-accommodate-dialog';
    dialogConfig.data = {
      assistanceTypeId: this.assistanceDetails.assistanceTypeId,
      dataForm: this.assistanceDetails,
    };

    this.dialogRef = this._matDialog.open(AccommodateAssistanceModalComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe((response: any) => {
      console.log(response);
      if (!response) {
        return;
      }

      const { data, personnels = [] } = response;
      const { key } = this.assistanceDetails;
      const sendPayload = {
        costNotes: data.notes,
        timeType: data.timeType,
        timeValue: data.timeValue,
        costAmount: data.assistanceCost,
        mechanicId: personnels[0].id,
        status: 'IN-PROGRESS',
      };

      if (!personnels.length) {
        this._matSnackBar.open('Something went wrong', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        return;
      }

      updateAssistance(key, sendPayload).then(() => {
        this._matSnackBar.open('Assistance ON Progress....', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
      });
    });
  }
}
