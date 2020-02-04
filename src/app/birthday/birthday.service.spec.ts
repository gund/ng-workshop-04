/* tslint:disable:no-unused-variable */

import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import { BirthdayService } from './birthday.service';

describe('Service: Birthday', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BirthdayService]
    });
  });

  describe('getBirthdayFor() method', () => {
    it('should return new Date observable', fakeAsync(() => {
      const callback = jasmine.createSpy();

      getService()
          .getBirthdayFor('Vasya')
          .subscribe(callback);

      tick(5000);

      expect(callback).toHaveBeenCalledWith(jasmine.any(Date));
    }));

    it('should return error observable', fakeAsync(() => {
      const callback = jasmine.createSpy();
      const errorObs = () => {
        getService()
            .getBirthdayFor('')
            .subscribe(callback);

        tick(5000);
      };

      expect(errorObs).toThrow('Unable to find birthday for empty name!');
    }));
  });
});

function getService(): BirthdayService {
  return TestBed.get(BirthdayService);
}
