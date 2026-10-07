import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { InversionAll } from './inversion-all';

describe('InversionAll', () => {
  let component: InversionAll;
  let fixture: ComponentFixture<InversionAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InversionAll],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InversionAll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
