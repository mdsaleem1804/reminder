import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayComponent } from './taxpay.component';

describe('TaxpayComponent', () => {
  let component: TaxpayComponent;
  let fixture: ComponentFixture<TaxpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
