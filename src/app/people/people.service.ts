import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { delayApi } from '../util/delay-api';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  getAll(): Observable<string[]> {
    // Fake API request with mocked data
    return of(['Vasya', 'Petya', 'John', 'Bob', '']).pipe(delayApi());
  }
}
