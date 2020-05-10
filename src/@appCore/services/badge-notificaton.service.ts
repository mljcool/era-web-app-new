import { Injectable } from '@angular/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';




@Injectable({
  providedIn: 'root'
})
export class BadgeNotificationService {


  constructor(private _fuseNavigationService: FuseNavigationService) {

  }

  servedNotificationBadges(): void {

    this._fuseNavigationService.updateNavigationItem('assistance', {
      badge: {
        title: '2',
        bg: '#F44336',
        fg: '#FFFFFF'
      }
    });
  }

}