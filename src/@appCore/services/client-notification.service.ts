import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { NotificationMessage } from '@appCore/models/notification.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: "root"
})
export class GlobalsServiceNotification {

  STATIC_URL: string = "https://fcm.googleapis.com/fcm/send";

  constructor(private http: HttpClient) {
  }

  public notifyClients(data: NotificationMessage): Observable<any> {
    let headers = new HttpHeaders().set(
      "Authorization",
      `key=` + environment.GMC_KEY
    );
    headers = headers.set("Content-Type", "application/json");
    const finalData = JSON.stringify(data);
    return this.http.post<any>(this.STATIC_URL, finalData, {
      headers: headers
    });
  }


}
