import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  showNotifications = new BehaviorSubject(false);
  messageNotification = new BehaviorSubject('success');
  colorNotification = new BehaviorSubject('green');
  searchValue = new Subject();
  showSpinner = new BehaviorSubject(false);
  constructor() {}

  toNotify(color: string, message: string) {
    this.messageNotification.next(message);
    this.colorNotification.next(color);
    this.showNotifications.next(true);
  }
}
