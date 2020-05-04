import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


firebase.initializeApp(environment.firebase);



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
      console.info('autoShop', allShop);
      this.onAutoShop.next(allShop);
    });
  }

}