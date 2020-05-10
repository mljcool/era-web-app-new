
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { Injectable } from '@angular/core';
import { firebase } from '@appCore/firebase/firebase-config';
import { IShop } from '@appCore/models/Shop';
import { ShopServiceDetailsModel } from 'app/pages/shopservices/shopservice-details/shopservice-details.model';
import { Mechanics } from 'app/pages/mechanics/mechanics.model';

@Injectable({
  providedIn: 'root'
})
export class StoreServices {

  onAutoShop: BehaviorSubject<IShop>;
  onServicesAutoShop: BehaviorSubject<ShopServiceDetailsModel[] | any>;
  onProductsAutoShop: BehaviorSubject<ShopServiceDetailsModel[] | any>;
  onMechanicsAutoShop: BehaviorSubject<Mechanics[] | any>;

  constructor() {
    this.onAutoShop = new BehaviorSubject({});
    this.onServicesAutoShop = new BehaviorSubject([]);
    this.onProductsAutoShop = new BehaviorSubject([]);
    this.onMechanicsAutoShop = new BehaviorSubject([]);

  }

  getMassiveData(uid: string) {
    const newShopList = firebase.firestore().collection('newShopList').where('uid', '==', uid);
    newShopList.onSnapshot((snapshot) => {
      const allShop = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }))[0];

      this.onAutoShop.next(allShop);
      console.log(allShop);
    });


    const newShopServices = firebase.firestore().collection('newShopServices').where('shopuid', '==', uid);
    newShopServices.onSnapshot((snapshot) => {
      const allServices = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }));

      this.onServicesAutoShop.next(allServices);
      console.log(allServices);
    });

    const newShopProducts = firebase.firestore().collection('newShopProducts').where('shopuid', '==', uid);
    newShopProducts.onSnapshot((snapshot) => {
      const allProducts = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }));

      this.onProductsAutoShop.next(allProducts);
      console.log(allProducts);
    });


    const newShopMechanics = firebase.firestore().collection('newShopMechanics').where('shopuid', '==', uid);
    newShopMechanics.onSnapshot((snapshot) => {
      const allMechanics = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }));

      this.onMechanicsAutoShop.next(allMechanics);
      console.log(allMechanics);
    });




  }



}