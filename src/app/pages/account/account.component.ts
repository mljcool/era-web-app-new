import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { StoreServices } from '@appCore/services/store.services';
import { IShop } from '@appCore/models/Shop';
import { Subject } from 'rxjs';
import { ClientService } from '@appCore/services/client.service';
import { IUser } from '@appCore/models/User';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent implements OnInit, OnDestroy {

  shopData: IShop;
  userInfo: IUser;
  isLoadedShop: boolean = false;
  isLoadedUser: boolean = false;

  private _unsubscribeAll: Subject<any>;

  constructor(private _storeSrvc: StoreServices, private _clientSrvc: ClientService, ) {


    this._unsubscribeAll = new Subject();
    this.isLoadedShop = false;
    this.isLoadedUser = false;

  }

  ngOnInit(): void {
    this._storeSrvc.onAutoShop
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.shopData = response;
        this.isLoadedShop = true;
      });

    this._clientSrvc.onUserDataInfo
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((userInfo) => {
        this.userInfo = userInfo;
        this.isLoadedUser = true;
      });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  checkIfirst(): boolean {
    const isloadNow = Object.keys((this.shopData || {})).length;
    return !!isloadNow;
  }

}
