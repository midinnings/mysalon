import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RefferalPage } from './refferal.page';

describe('RefferalPage', () => {
  let component: RefferalPage;
  let fixture: ComponentFixture<RefferalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefferalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RefferalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
