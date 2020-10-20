import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BirthdayService } from './birthday.service';

describe('Service: Birthday', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BirthdayService]
    });
  });

  describe('getBirthdayFor() method', () => {
    it('should return observable of mocked data', fakeAsync(() => {
      const callback = jasmine.createSpy();

      getService()
        .getBirthdayFor('name')
        .subscribe(callback);

      tick(5000);

      expect(callback).toHaveBeenCalledWith(jasmine.any(Date));
    }));

    it('should return error in mocked data', fakeAsync(() => {
      const callback = () => {
        getService()
          .getBirthdayFor('')
          .subscribe(jasmine.createSpy());

        tick(5000);
      }

      expect(callback).toThrow('Unable to find birthday for empty name!');
    }));
  });
});

function getService(): BirthdayService {
  return TestBed.get(BirthdayService);
}
