/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BirthdayComponent} from './birthday.component';
import {BirthdayService} from './birthday.service';
import {SimpleChange} from '@angular/core';
import {Subject} from 'rxjs';
import {By} from '@angular/platform-browser';

class BirthServiceMock {
  getBirthdaySubject$ = new Subject();
  getBirthdayFor = jasmine.createSpy().and.returnValue(this.getBirthdaySubject$);
}

describe('BirthdayComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BirthdayComponent],
      providers: [{provide: BirthdayService, useClass: BirthServiceMock}],
    }).compileComponents();
  }));

  let fixture: ComponentFixture<BirthdayComponent>;
  const name = 'Anya';
  const dateMock = '5/12/90';

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayComponent);
    fixture.componentInstance.name = name;
    fixture.componentInstance.ngOnChanges({
      name: new SimpleChange(null, fixture.componentInstance.name, true)
    });
  });

  it('should call `BirthdayService.getBirthdayFor()` initially', () => {
    fixture.detectChanges();

    expect(getBirthdayServiceMock().getBirthdayFor).toHaveBeenCalled();
  });

  it('should render loading text in `p.loading` initially', () => {
    fixture.detectChanges();

    const pElem = fixture.debugElement.query(By.css('p.loading'));
    expect(pElem.nativeElement.textContent).toMatch(
      `Loading birthday data for ${name}...`,
    );
  });

  it('should render error in `p.error` when `BirthdayService.getBirthdayFor()` fails', () => {
    fixture.detectChanges();
    getBirthdayServiceMock().getBirthdaySubject$.error('reason');
    fixture.detectChanges();

    const pElem = fixture.debugElement.query(By.css('p.error'));
    expect(pElem.nativeElement.textContent).toMatch(
      'Failed to load birthday data: reason'
    );
  });
  it('should render title with name and date in `p.title`', () => {
    fixture.detectChanges();
    getBirthdayServiceMock().getBirthdaySubject$.next(dateMock);
    fixture.detectChanges();

    const pElem = fixture.debugElement.query(By.css('p.title'));
    expect(pElem.nativeElement.textContent).toMatch(`${name}'s birthday is on ${dateMock}`);
  });
});

function getBirthdayServiceMock(): BirthServiceMock {
  return TestBed.get(BirthdayService);
}
