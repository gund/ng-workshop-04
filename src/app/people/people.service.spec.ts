import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PeopleService } from './people.service';

describe('Service: People', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Usually mock Http services here...
      providers: [PeopleService],
    });
  });

  describe('getAll() method', () => {
    it('should return observable of mocked data', fakeAsync(() => {
      const callback = jasmine.createSpy();

      getService()
        .getAll()
        .subscribe(callback);

      // Simulate 5s time passage
      tick(5000);

      expect(callback).toHaveBeenCalledWith([
        'Vasya',
        'Petya',
        'John',
        'Bob',
        '',
      ]);
    }));
  });
});

function getService(): PeopleService {
  return TestBed.get(PeopleService);
}
