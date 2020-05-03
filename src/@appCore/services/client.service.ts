import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable()
export class ClientService {


  onUserChanges: BehaviorSubject<any>;

  public datas = '';

  constructor() {
    this.onUserChanges = new BehaviorSubject({});
    console.log('I been called once!');
  }


}