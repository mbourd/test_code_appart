import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidatorComponent } from './form-validator.component';

describe('FormValidatorComponent', () => {
  let component: FormValidatorComponent;
  let fixture: ComponentFixture<FormValidatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormValidatorComponent]
    });
    fixture = TestBed.createComponent(FormValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
