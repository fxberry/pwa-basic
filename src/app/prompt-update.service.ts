import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PromptUpdateService {

  constructor(swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      if (confirm('New version available. Load New Version?')) {
        swUpdate.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
