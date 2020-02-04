/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BirthdayComponent} from './birthday.component';
import {Subject} from 'rxjs';
import {BirthdayService} from './birthday.service';
import {SimpleChange} from '@angular/core';
import {By} from '@angular/platform-browser';

class BirthdayServiceMock {
    getAllSubject$ = new Subject();
    getBirthdayFor = jasmine.createSpy().and.returnValue(this.getAllSubject$);
}

describe('BirthdayComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BirthdayComponent],
            providers: [{provide: BirthdayService, useClass: BirthdayServiceMock}],
        }).compileComponents();
    });

    let fixture: ComponentFixture<BirthdayComponent>;
    const mockedName = 'Vasya';

    beforeEach(() => {
        fixture = TestBed.createComponent(BirthdayComponent);
        const componentInstance = fixture.componentInstance;
        componentInstance.name = mockedName;

        componentInstance.ngOnChanges({
            name: new SimpleChange(null, componentInstance.name, true)
        });
    });

    it('should call `BirthdayService.getBirthdayFor()` on change name property', () => {
        fixture.detectChanges();

        expect(getService().getBirthdayFor).toHaveBeenCalled();
    });

    it('should render loading text in `p` with loading text on change name property', () => {
        fixture.detectChanges();
        console.log(fixture.debugElement.query(By.css('p')));

        const pElem = fixture.debugElement.query(By.css('p'));

        expect(pElem.nativeElement.textContent).toMatch(
            `Loading birthday data for ${mockedName}...`,
        );
    });

    it('should render error in `p` with error text when `BirthdayService.getBirthdayFor()` fails', () => {
        fixture.detectChanges();

        getService().getAllSubject$.error('reason');

        fixture.detectChanges();

        const pElem = fixture.debugElement.query(By.css('p'));

        expect(pElem.nativeElement.textContent).toMatch(
            'Failed to load birthday data: reason',
        );
    });

    describe('when birthday component loaded', () => {
        const mockedDate = new Date();

        beforeEach(() => {
            fixture.detectChanges();
            getService().getAllSubject$.next(mockedDate);
            fixture.detectChanges();
        });

        it('should render `p` with name and person birthday', () => {
            const pElem = fixture.debugElement.query(By.css('p'));
            const transformedDate = mockedDate.toLocaleDateString('en-US', {
                year: '2-digit',
                month: 'numeric',
                day: 'numeric'
            });

            expect(pElem.nativeElement.textContent).toMatch(
                `${mockedName}'s birthday is on ${transformedDate}`,
            );
        });
    });
});

function getService(): BirthdayServiceMock {
    return TestBed.get(BirthdayService);
}
