import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { interval, concat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {

  constructor(appRef: ApplicationRef, updates: SwUpdate) {
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everyFiveSeconds$ = interval(5 * 1000);
    const everyFiveSecondsAppIsStable$ = concat(appIsStable$, everyFiveSeconds$);

    console.log('check for update service init.');

    everyFiveSecondsAppIsStable$.subscribe(() => {
      console.log('UPDATE CHECK');
      updates.checkForUpdate();
    });
  }
}
