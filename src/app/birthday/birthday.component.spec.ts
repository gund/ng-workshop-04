/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser'

import { BirthdayComponent } from './birthday.component';

describe('BirthdayComponent', () => {
  let component: BirthdayComponent;
  let fixture: ComponentFixture<BirthdayComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BirthdayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be created', () => {
    expect(fixture).toBeTruthy();
  });

  it('should render p element', () => {
    const parragraphElement = fixture.debugElement.query(By.css('p'));
    expect(parragraphElement).toBeTruthy();
  });

  it('should update element with new name', ()=> {
    const innerTextModifier: string = 'Alex';
    const expectedString: string = `${innerTextModifier}'s birthday is on`;
    const parragraphElement = fixture.debugElement.query(By.css('p'));

    component.name = innerTextModifier;
    fixture.detectChanges();

    expect(parragraphElement.nativeElement.textContent).toContain(expectedString);
  });
});
