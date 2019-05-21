import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebNotificationService {

  constructor(private swPush: SwPush,
              private http: HttpClient) {
  }

  subscribeToNotification() {
    this.swPush.requestSubscription(
      {serverPublicKey: 'BL5nC-N8lmUe8dqnYtgqLFJWtNPt28A8Xp4oY3ka82QUY0H4Jx3kD_rRrvfK9QvC2Ig4KZVNI9kPBL3860GKAjg' })
      .then((sub) => {
        console.log('PUSH SUB: ', sub);
        this.registerOnServer(sub);
      });
  }

  registerOnServer(sub: PushSubscription) {
    console.log('subscribePush');
    this.http.post('http://localhost:3000/subscribe', sub).pipe(
      tap((res) => {
        console.log(res);
      })
    ).subscribe();

    this.swPush.notificationClicks.subscribe((clicked) => {
      const payload: any = clicked.notification.data;

      console.log('payload');
      console.log('name: ' + payload.name);

    });
  }

}
