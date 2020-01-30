import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { delayApi } from '../util/delay-api';
import { random } from '../util/random';

@Injectable({
  providedIn: 'root',
})
export class BirthdayService {
  private CURRENT_YEAR = new Date().getFullYear();

  getBirthdayFor(name: string): Observable<Date> {
    if (!name) {
      return throwError('Unable to find birthday for empty name!');
    }

    // We fake a lookup here by generating random dates
    return of(
      new Date(
        random(this.CURRENT_YEAR - 100, this.CURRENT_YEAR),
        random(0, 11), // Month is shifted by -1
        random(1, 31), // Day
        random(0, 59), // Hours
        random(0, 59), // Minutes
        random(0, 59), // Seconds
        random(0, 1000), // Milliseconds
      ),
    ).pipe(delayApi());
  }
}
