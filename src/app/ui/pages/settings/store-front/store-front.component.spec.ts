import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFrontComponent } from './store-front.component';

describe('StoreFrontComponent', () => {
  let component: StoreFrontComponent;
  let fixture: ComponentFixture<StoreFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreFrontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
