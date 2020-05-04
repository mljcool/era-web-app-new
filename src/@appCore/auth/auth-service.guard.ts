import { Injectable } from "@angular/core";
import {
    CanLoad,
    Router,
    Route,
    UrlSegment
} from "@angular/router";
import { Observable } from "rxjs";
import { ClientService } from '@appCore/services/client.service';



@Injectable({
    providedIn: "root"
})
export class AuthServiceGuard implements CanLoad {

    constructor(private _clientSrvc: ClientService, private router: Router) { }

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {

        return !!this._clientSrvc.canLoadModule;

    }
}
