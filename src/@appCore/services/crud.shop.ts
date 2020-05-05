import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CrudServiceShop {
  private dbPath = '/newShopList';

  userShopRef: AngularFirestoreCollection<any> = null;

  constructor(private db: AngularFirestore) {
    this.userShopRef = db.collection(this.dbPath);
  }

  insertNewShop(data: any): Promise<any> {
    return this.userShopRef.add(data);
  }
}
