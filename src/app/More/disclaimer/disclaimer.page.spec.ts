import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DisclaimerPage } from './disclaimer.page';

describe('DisclaimerPage', () => {
  let component: DisclaimerPage;
  let fixture: ComponentFixture<DisclaimerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisclaimerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DisclaimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
