import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CancelappointmentPage } from './cancelappointment.page';

describe('CancelappointmentPage', () => {
  let component: CancelappointmentPage;
  let fixture: ComponentFixture<CancelappointmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelappointmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelappointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
