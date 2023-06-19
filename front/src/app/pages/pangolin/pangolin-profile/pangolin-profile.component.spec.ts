import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangolinProfileComponent } from './pangolin-profile.component';

describe('PangolinProfileComponent', () => {
  let component: PangolinProfileComponent;
  let fixture: ComponentFixture<PangolinProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PangolinProfileComponent]
    });
    fixture = TestBed.createComponent(PangolinProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
