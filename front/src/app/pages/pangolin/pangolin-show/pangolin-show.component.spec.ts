import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangolinShowComponent } from './pangolin-show.component';

describe('PangolinShowComponent', () => {
  let component: PangolinShowComponent;
  let fixture: ComponentFixture<PangolinShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PangolinShowComponent]
    });
    fixture = TestBed.createComponent(PangolinShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
