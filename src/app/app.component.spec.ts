import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { AppComponent } from './app.component';
import { PeopleService } from './people/people.service';
import { By } from '@angular/platform-browser';

class PeopleServiceMock {
  getAllSubject$ = new Subject();
  getAll = jasmine.createSpy().and.returnValue(this.getAllSubject$);
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: PeopleService, useClass: PeopleServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should call `PeopleService.getAll()` initially', () => {
    fixture.detectChanges();

    expect(getPeopleServiceMock().getAll).toHaveBeenCalled();
  });

  it('should render loading text in `p.loading` initially', () => {
    fixture.detectChanges();

    const pElem = fixture.debugElement.query(By.css('p.loading'));

    expect(pElem.nativeElement.textContent).toMatch(
      'Loading all the people...',
    );
  });

  it('should render error in `p.error` when `PeopleService.getAll()` fails', () => {
    fixture.detectChanges();

    getPeopleServiceMock().getAllSubject$.error('reason');

    fixture.detectChanges();

    const pElem = fixture.debugElement.query(By.css('p.error'));

    expect(pElem.nativeElement.textContent).toMatch(
      'Failed to load all people: reason',
    );
  });

  describe('when people loaded', () => {
    const peopleMock = ['dude1', 'dude2'];

    beforeEach(() => {
      fixture.detectChanges();
      getPeopleServiceMock().getAllSubject$.next(peopleMock);
      fixture.detectChanges();
    });

    it('should render title with refresh button in `p.title`', () => {
      const pElem = fixture.debugElement.query(By.css('p.title'));
      const btnElem = pElem.query(By.css('button'));

      expect(pElem.nativeElement.textContent).toMatch('People:');
      expect(btnElem.nativeElement.textContent).toMatch('Refresh');
    });

    it('should render <app-birthday> for all people in `ul>li`', () => {
      const birthdayElems = fixture.debugElement.queryAll(
        By.css('ul>li app-birthday'),
      );

      expect(birthdayElems.length).toBe(peopleMock.length);
    });

    it('should bind people to app-birthday[name]', () => {
      const birthdayElems = fixture.debugElement.queryAll(
        By.css('ul>li app-birthday'),
      );

      peopleMock.forEach((dude, i) =>
        expect(birthdayElems[i].properties.name).toBe(dude),
      );
    });

    describe('click on refresh button', () => {
      let refreshBth: DebugElement;

      beforeEach(
        () =>
          (refreshBth = fixture.debugElement.query(By.css('p.title button'))),
      );

      it('should recall `PeopleService.getAll()`', () => {
        getPeopleServiceMock().getAll.calls.reset();

        refreshBth.triggerEventHandler('click', {});

        fixture.detectChanges();

        expect(getPeopleServiceMock().getAll).toHaveBeenCalled();
      });

      it('should render loading message', () => {
        refreshBth.triggerEventHandler('click', {});

        fixture.detectChanges();

        const pElem = fixture.debugElement.query(By.css('p.loading'));

        expect(pElem.nativeElement.textContent).toMatch(
          'Loading all the people...',
        );
      });
    });
  });
});

function getPeopleServiceMock(): PeopleServiceMock {
  return TestBed.get(PeopleService);
}
