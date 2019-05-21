import { Component } from '@angular/core';
import { CheckForUpdateService } from './check-for-update.service';
import { LogUpdateService } from './log-update.service';
import { PromptUpdateService } from './prompt-update.service';
import { SwPush } from '@angular/service-worker';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pwa';

  // constructor(pus: PromptUpdateService,
  //             cfus: CheckForUpdateService,
  //             lus: LogUpdateService) {
  // }

  constructor(private swPush: SwPush,
              private http: HttpClient,
              pus: PromptUpdateService,
              cfus: CheckForUpdateService,
              lus: LogUpdateService) {
    this.swPush.requestSubscription(
      {serverPublicKey: 'BL5nC-N8lmUe8dqnYtgqLFJWtNPt28A8Xp4oY3ka82QUY0H4Jx3kD_rRrvfK9QvC2Ig4KZVNI9kPBL3860GKAjg' })
      .then((sub) => {
        console.log('PUSH SUB: ', sub);
        this.subscribePush(sub);
      });
  }

  subscribePush(sub: PushSubscription) {
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

  notify() {
    console.log('notifyMe');
    this.http.post('http://localhost:3000/notifyme', {id: 1, check: true}).subscribe();
  }
}
