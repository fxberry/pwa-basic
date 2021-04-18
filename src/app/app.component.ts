import { Component, OnInit } from '@angular/core';
import { CheckForUpdateService } from './check-for-update.service';
import { LogUpdateService } from './log-update.service';
import { PromptUpdateService } from './prompt-update.service';
import { HttpClient } from '@angular/common/http';
import { WebNotificationService } from './web-notification.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwa';

  date$: Observable<any>;
  secondDate$: Observable<any>;
  thirdDate$: Observable<any>;
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

  ngOnInit(): void {
    this.refresh();
  }

  notify() {
    console.log('notifyMe');
    this.http.post('http://localhost:3000/notifyme', {id: 1, check: true}).subscribe();
  }

  refresh() {
    this.date$ = this.http.get('http://localhost:3000/first');

    this.secondDate$ = this.http.get('http://localhost:3000/second');

    this.thirdDate$ = this.http.get('http://localhost:3000/third');
  }
}
