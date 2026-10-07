import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { InversionLookup } from './inversion-lookup';

describe('InversionLookup', () => {
  let component: InversionLookup;
  let fixture: ComponentFixture<InversionLookup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InversionLookup],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(InversionLookup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
