
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { Injectable } from '@angular/core';
import { firebase } from '@appCore/firebase/firebase-config';

@Injectable({
  providedIn: 'root'
})
export class StoreServices {

  onAutoShop: BehaviorSubject<any>;

  constructor() {
    this.onAutoShop = new BehaviorSubject({});

  }

  getMassiveData() {
    const getData = firebase.firestore().collection('newShopList');
    getData.onSnapshot((snapshot) => {
      const allShop = snapshot.docs.map((shop) => ({
        id: shop.id,
        ...shop.data(),
      }));
      console.info('newShopList', allShop);
      this.onAutoShop.next(allShop);
    });
  }

}