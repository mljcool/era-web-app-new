import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { StoreServices } from '@appCore/services/store.services';
import { takeUntil } from 'rxjs/operators';
import { getAllRatings, timeSince } from '@appCore/firebaseRef/StarRatingRef';

@Component({
  selector: 'quick-panel',
  templateUrl: './quick-panel.component.html',
  styleUrls: ['./quick-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuickPanelComponent implements OnInit, OnDestroy {
  date: Date;
  events: any[];
  notes: any[];
  settings: any;
  allRAtings: any[] = [];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient, private _storeSrvc: StoreServices) {
    // Set the defaults
    this.date = new Date();
    this.settings = {
      notify: true,
      cloud: false,
      retro: true,
    };

    // Set the private defaults
    this._unsubscribeAll = new Subject();
    this._storeSrvc.onAutoShop.pipe(takeUntil(this._unsubscribeAll)).subscribe((onAutoShop) => {
      console.log('onAutoShop', onAutoShop);
      if (!Object.keys(onAutoShop).length) {
        return;
      }
      const { uid } = onAutoShop;
      getAllRatings(uid).onSnapshot((snapshot) => {
        this.allRAtings = snapshot.docs
          .map((users) => ({
            key: users.id,
            ...users.data(),
          }))
          .map((data: any) => {
            data.timeSince = timeSince(data.dateCreated.toDate());
            return data;
          });
        console.log('this.allRAtings', this.allRAtings);
      });
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {}

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
