import { SimpleChange } from "@angular/core";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { Subject } from "rxjs";

import { BirthdayComponent } from './birthday.component';
import { BirthdayService } from "./birthday.service";

class BirthdayServiceMock {
  getBirthdayForSubject$ = new Subject();
  getBirthdayFor = jasmine.createSpy().and.returnValue(this.getBirthdayForSubject$);
}

describe('BirthdayComponent', () => {
  let fixture: ComponentFixture<BirthdayComponent>;
  const name: string = 'name';
  const errorMessage: string = 'reason';
  const date: string = '12/12/90';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BirthdayComponent],
      providers: [{ provide: BirthdayService, useClass: BirthdayServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayComponent);
    fixture.componentInstance.name = name;
    fixture.componentInstance.ngOnChanges({
      name: new SimpleChange(null, fixture.componentInstance.name, true)
    });
  });

  it('should call `BirthdayService.getBirthdayFor(`name`)` initially', () => {
    fixture.detectChanges();
    expect(getServiceMock().getBirthdayFor).toHaveBeenCalled();
  });

  it('should render loading text in `p.loading` initially', () => {
    fixture.detectChanges();
    const pElement = fixture.debugElement.query(By.css('p.loading'));
    expect(pElement.nativeElement.textContent).toMatch(`Loading birthday data for ${ name }...`);
  });

  it('should render error in `p.error` when `BirthdayService.getBirthdayFor(`name`)` fails', () => {
    fixture.detectChanges();
    getServiceMock().getBirthdayForSubject$.error(errorMessage);
    fixture.detectChanges();
    const pElement = fixture.debugElement.query(By.css('p.error'));
    expect(pElement.nativeElement.textContent).toMatch(`Failed to load birthday data: ${ errorMessage }`);
  });

  it('should render text in p.birthday with a new date', () => {
    fixture.detectChanges();
    getServiceMock().getBirthdayForSubject$.next(date);
    fixture.detectChanges();
    const pElement = fixture.debugElement.query(By.css('p.birthday'));
    expect(pElement.nativeElement.textContent).toMatch(`${ name }'s birthday is on ${ date }`);
  });
});

function getServiceMock(): BirthdayServiceMock {
  return TestBed.get(BirthdayService);
}
