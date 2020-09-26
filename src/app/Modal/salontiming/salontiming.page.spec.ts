import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalonTimingPage } from './salontiming.page';

describe('SalonTimingPage', () => {
  let component: SalonTimingPage;
  let fixture: ComponentFixture<SalonTimingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonTimingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalonTimingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
