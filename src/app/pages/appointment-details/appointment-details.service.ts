import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAssistance } from '@appCore/models/IAssistance.model';

@Injectable()
export class BookingDetailsServices {
	constructor(private http: HttpClient) {}

	getAssistance(): Promise<IAssistance[] | any> {
		return new Promise((resolve, reject) => {
			this.http.get('api/all-assistance').subscribe((response: IAssistance) => {
				console.log(response);
				resolve(response);
			}, reject);
		});
	}
}
