import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {
  FirebaseUISignInSuccessWithAuthResult,
  FirebaseUISignInFailure,
} from 'firebaseui-angular';
import { ClientService } from '@appCore/services/client.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class LoginComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _clientSrvc: ClientService,
    private _router: Router
  ) {
    this.fuseLayOut();
    this._unsubscribeAll = new Subject();
    this._clientSrvc.onUserInLoggedIn
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((isloggeInd) => {
        if (isloggeInd) {
          this._router.navigate(['/assistance']);
        }
      });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  fuseLayOut() {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        toolbar: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        sidepanel: {
          hidden: true,
        },
      },
    };
  }
  successCallback(
    signInSuccessData: FirebaseUISignInSuccessWithAuthResult
  ): void {
  }

  errorCallback(errorData: FirebaseUISignInFailure): void {
  }
}
