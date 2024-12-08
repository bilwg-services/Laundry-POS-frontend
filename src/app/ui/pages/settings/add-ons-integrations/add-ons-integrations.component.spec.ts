import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnsIntegrationsComponent } from './add-ons-integrations.component';

describe('AddOnsIntegrationsComponent', () => {
  let component: AddOnsIntegrationsComponent;
  let fixture: ComponentFixture<AddOnsIntegrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOnsIntegrationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOnsIntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
