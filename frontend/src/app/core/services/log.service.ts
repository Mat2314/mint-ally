import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private productionMode: boolean = environment.production;

  constructor() { }

  /**
   * Dispaly log message when application is in development environment.
   */
  log(...args: any[]): void {
    if (!this.productionMode) {
      console.log(...args);
    }
  }
}
