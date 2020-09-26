import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuponsPage } from './cupons.page';

describe('CuponsPage', () => {
  let component: CuponsPage;
  let fixture: ComponentFixture<CuponsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuponsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuponsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
