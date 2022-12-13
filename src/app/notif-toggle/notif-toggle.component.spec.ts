import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifToggleComponent } from './notif-toggle.component';

describe('NotifToggleComponent', () => {
  let component: NotifToggleComponent;
  let fixture: ComponentFixture<NotifToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
