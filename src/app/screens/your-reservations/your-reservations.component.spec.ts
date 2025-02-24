import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourReservationsComponent } from './your-reservations.component';

describe('YourReservationsComponent', () => {
  let component: YourReservationsComponent;
  let fixture: ComponentFixture<YourReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourReservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
