import { Injectable } from '@angular/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';


@Injectable({
  providedIn: 'root'
})
export class BadgeNotificationService {


  constructor(private _fuseNavigationService: FuseNavigationService) {

  }

  servedNotificationBadges(navigation = '', counter = 0): void {

    this._fuseNavigationService.updateNavigationItem(navigation, {
      badge: {
        title: (counter || '').toString(),
        bg: '#F44336',
        fg: '#FFFFFF'
      }
    });
  }

}