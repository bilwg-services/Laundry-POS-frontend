import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRateListComponent } from './add-rate-list.component';

describe('AddRateListComponent', () => {
  let component: AddRateListComponent;
  let fixture: ComponentFixture<AddRateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRateListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
