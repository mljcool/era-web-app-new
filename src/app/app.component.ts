import { CheckerServices } from './../@appCore/services/checker.service';
import { ClientService } from './../@appCore/services/client.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';

import { navigation } from 'app/navigation/navigation';
import { Router, NavigationEnd } from '@angular/router';
import { StoreServices } from '@appCore/services/store.services';
import { BadgeNotificationService } from '@appCore/services/badge-notificaton.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;

  // Private
  private _unsubscribeAll: Subject<any>;
  private _unsubscribeNavigate: Subject<any>;

  /**
   * Constructor
   *
   * @param {DOCUMENT} document
   * @param {FuseConfigService} _fuseConfigService
   * @param {FuseNavigationService} _fuseNavigationService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {FuseSplashScreenService} _fuseSplashScreenService
   * @param {Platform} _platform
   * @param {TranslateService} _translateService
   */
  constructor(
    @Inject(DOCUMENT) private document: any,
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _BadgeNotificationService: BadgeNotificationService,
    private _clientSrvc: ClientService,
    private _checkerSrvc: CheckerServices,
    private _StoreServices: StoreServices,
    private _platform: Platform,
    private _router: Router
  ) {
    // Get default navigation
    this.setNavigationAndPlatforms();
    this._clientSrvc.checkIfUserIsLogin();
    this._clientSrvc.onUserInLoggedIn.pipe(takeUntil(this._unsubscribeAll)).subscribe((islog) => {
      if (islog) {
        this._checkerSrvc.checkClienthasRegistration();
      }
    });
    this._clientSrvc.onUserDataInfo.pipe(takeUntil(this._unsubscribeAll)).subscribe((islog) => {
      if (islog.uid) {
        this._StoreServices.getMassiveData(islog.uid);
        this._StoreServices.onAllAssistance.pipe(takeUntil(this._unsubscribeAll)).subscribe((assistance) => {
          const assistanceNew = assistance.filter((assist) => assist.status === 'PENDING');
          this._BadgeNotificationService.servedNotificationBadges('assistance', assistanceNew.length);
        });
      }
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((config) => {
      this.fuseConfig = config;
      // Boxed
      if (this.fuseConfig.layout.width === 'boxed') {
        this.document.body.classList.add('boxed');
      } else {
        this.document.body.classList.remove('boxed');
      }

      // Color theme - Use normal for loop for IE11 compatibility
      for (let i = 0; i < this.document.body.classList.length; i++) {
        const className = this.document.body.classList[i];

        if (className.startsWith('theme-')) {
          this.document.body.classList.remove(className);
        }
      }

      this.document.body.classList.add(this.fuseConfig.colorTheme);
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  setNavigationAndPlatforms(): void {
    this.navigation = navigation;
    this._fuseNavigationService.register('main', this.navigation);
    this._fuseNavigationService.setCurrentNavigation('main');

    // Add is-mobile class to the body if the platform is mobile
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    this._unsubscribeNavigate = new Subject();
  }
}
