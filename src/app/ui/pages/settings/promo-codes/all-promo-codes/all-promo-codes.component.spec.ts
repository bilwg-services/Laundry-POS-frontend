import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPromoCodesComponent } from './all-promo-codes.component';

describe('AllPromoCodesComponent', () => {
  let component: AllPromoCodesComponent;
  let fixture: ComponentFixture<AllPromoCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllPromoCodesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPromoCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
