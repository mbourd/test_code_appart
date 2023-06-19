import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangolinEditComponent } from './pangolin-edit.component';

describe('PangolinEditComponent', () => {
  let component: PangolinEditComponent;
  let fixture: ComponentFixture<PangolinEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PangolinEditComponent]
    });
    fixture = TestBed.createComponent(PangolinEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
