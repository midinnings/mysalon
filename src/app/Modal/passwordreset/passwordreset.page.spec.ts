import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PasswordresetPage } from './passwordreset.page';

describe('PasswordresetPage', () => {
  let component: PasswordresetPage;
  let fixture: ComponentFixture<PasswordresetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordresetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordresetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
