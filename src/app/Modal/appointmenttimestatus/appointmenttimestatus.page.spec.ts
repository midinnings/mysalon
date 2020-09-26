import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppointmenttimestatusPage } from './appointmenttimestatus.page';

describe('AppointmenttimestatusPage', () => {
  let component: AppointmenttimestatusPage;
  let fixture: ComponentFixture<AppointmenttimestatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmenttimestatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmenttimestatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
