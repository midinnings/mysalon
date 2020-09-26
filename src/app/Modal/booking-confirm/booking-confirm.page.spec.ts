import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingConfirmPage } from './booking-confirm.page';

describe('BookingConfirmPage', () => {
  let component: BookingConfirmPage;
  let fixture: ComponentFixture<BookingConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingConfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
