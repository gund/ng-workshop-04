/* tslint:disable:no-unused-variable */

import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { BirthdayService } from './birthday.service';

describe('Service: Birthday', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BirthdayService]
    });
  });

  it('Service should exist', inject([BirthdayService], (service: BirthdayService) => {
    expect(service).toBeTruthy();
  }));

  describe('getBirthdayFor behavior', () => {
    it('Should return Date object', fakeAsync(() => {
      let methodReturnedValue: Date;
  
      getService()
        .getBirthdayFor('Dima')
        .subscribe(event =>  methodReturnedValue = event);
  
      tick(5000);
  
      expect(checkIfDateReturned(methodReturnedValue)).toBeFalsy();
    }));
  
    it('Should throw Error if name wasn`t provided or an empty string was provided', fakeAsync(() => {
      const errorText: string = 'Unable to find birthday for empty name!';
  
      getService().getBirthdayFor('').subscribe(
        date => fail(`Expected an error, not ${date}`),
        error  => expect(error).toContain(errorText)
      )
    }));
  })  
});

function getService(): BirthdayService {
  return TestBed.get(BirthdayService);
}

function checkIfDateReturned(value: any): boolean {
  return isNaN(value.getTime()); // shouldn't be NaN as Date.getTime() returns number
}
