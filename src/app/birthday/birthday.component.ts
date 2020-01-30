import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EMPTY, merge, ReplaySubject } from 'rxjs';
import { catchError, mapTo, shareReplay, switchMap } from 'rxjs/operators';

import { BirthdayService } from './birthday.service';

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.css'],
})
export class BirthdayComponent implements OnChanges {
  @Input() name: string;

  name$ = new ReplaySubject<string>(1);

  error$ = new ReplaySubject(1);

  birthday$ = this.name$.pipe(
    switchMap(name =>
      this.birthdayService.getBirthdayFor(name).pipe(
        catchError(e => {
          this.error$.next(e);
          return EMPTY;
        }),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  isLoading$ = merge(
    this.name$.pipe(mapTo(true)),
    this.birthday$.pipe(mapTo(false)),
    this.error$.pipe(mapTo(false)),
  );

  constructor(private birthdayService: BirthdayService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('name' in changes) {
      this.name$.next(this.name);
    }
  }
}
