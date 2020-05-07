
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { Injectable } from '@angular/core';
import { firebase } from '@appCore/firebase/firebase-config';
import { IShop } from '@appCore/models/Shop';

@Injectable({
  providedIn: 'root'
})
export class StoreServices {

  onAutoShop: BehaviorSubject<IShop>;

  constructor() {
    this.onAutoShop = new BehaviorSubject({});

  }

  getMassiveData(uid: string) {
    const getData = firebase.firestore().collection('newShopList').where('uid', '==', uid);
    getData.onSnapshot((snapshot) => {
      const allShop = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }))[0];

      this.onAutoShop.next(allShop);
      console.log(allShop);
    });
  }



}