import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangolinFriendsComponent } from './pangolin-friends.component';

describe('PangolinFriendsComponent', () => {
  let component: PangolinFriendsComponent;
  let fixture: ComponentFixture<PangolinFriendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PangolinFriendsComponent]
    });
    fixture = TestBed.createComponent(PangolinFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
