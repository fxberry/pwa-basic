import { Component } from '@angular/core';
import { CheckForUpdateService } from './check-for-update.service';
import { LogUpdateService } from './log-update.service';
import { PromptUpdateService } from './prompt-update.service';
import { HttpClient } from '@angular/common/http';
import { WebNotificationService } from './web-notification.service';

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

  constructor(private http: HttpClient,
              pus: PromptUpdateService,
              cfus: CheckForUpdateService,
              lus: LogUpdateService,
              wns: WebNotificationService) {
                wns.subscribeToNotification();
  }

  notify() {
    console.log('notifyMe');
    this.http.post('http://localhost:3000/notifyme', {id: 1, check: true}).subscribe();
  }
}
