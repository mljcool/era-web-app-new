import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from '@appCore/models/User';

@Injectable()
export class ClientService {
  onUserChanges: BehaviorSubject<any>;
  onUserDataInfo: BehaviorSubject<IUser>;
  onUserInLoggedIn: BehaviorSubject<boolean>;

  public datas = '';
  public canLoadModule: boolean = false;
  public userRawData: any = {};

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.onUserChanges = new BehaviorSubject({});
    this.onUserDataInfo = new BehaviorSubject({ uid: null });
    this.onUserInLoggedIn = new BehaviorSubject(false);
    console.log('I been called once!');
  }

  checkIfUserIsLogin() {
    this.afAuth.authState.subscribe((response) => {
      const [userData] = (
        response || { providerData: [null] }
      ).providerData;

      this.canLoadModule = !!response;
      if (!!response) {
        this.onUserInLoggedIn.next(true);
        this.onUserDataInfo.next(userData);
        this.userRawData = userData;
      }
    });
  }

  logOut(): void {
    this.afAuth.signOut().then(() => {
      this.onUserInLoggedIn.next(false);
      this.router.navigate(['/login']);
    });
  }
}
