import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifBasicComponent } from './notif-basic.component';

describe('NotifBasicComponent', () => {
  let component: NotifBasicComponent;
  let fixture: ComponentFixture<NotifBasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifBasicComponent]
    });
    fixture = TestBed.createComponent(NotifBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
