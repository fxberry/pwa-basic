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
      {serverPublicKey: 'BFCksJuTRPyjcCFui6BpFkPOgsRxRG7E4dJUMn9v0HH_hKD8t8qTdGJc4_kPLpsE8RW0E3g-m8596hsalBkLSzU' })
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
