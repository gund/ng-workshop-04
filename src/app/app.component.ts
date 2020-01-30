import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMPTY, merge, ReplaySubject, Subject } from 'rxjs';
import {
  catchError,
  mapTo,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { PeopleService } from './people/people.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  loadPeople$ = new Subject();

  error$ = new ReplaySubject();

  fetchPeople$ = this.loadPeople$.pipe(startWith(null));

  allPeople$ = this.fetchPeople$.pipe(
    switchMap(() =>
      this.peopleService.getAll().pipe(
        catchError(e => {
          this.error$.next(e);
          return EMPTY;
        }),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  isLoading$ = merge(
    this.fetchPeople$.pipe(mapTo(true)),
    this.allPeople$.pipe(mapTo(false)),
    this.error$.pipe(mapTo(false)),
  ).pipe(startWith(true));

  constructor(private peopleService: PeopleService) {}

  refreshPeople() {
    this.loadPeople$.next();
  }
}
