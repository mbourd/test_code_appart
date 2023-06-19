import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousRegisterComponent } from './anonymous-register.component';

describe('AnonymousRegisterComponent', () => {
  let component: AnonymousRegisterComponent;
  let fixture: ComponentFixture<AnonymousRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnonymousRegisterComponent]
    });
    fixture = TestBed.createComponent(AnonymousRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
