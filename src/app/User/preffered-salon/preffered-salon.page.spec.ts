import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrefferedSalonPage } from './preffered-salon.page';

describe('PrefferedSalonPage', () => {
  let component: PrefferedSalonPage;
  let fixture: ComponentFixture<PrefferedSalonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefferedSalonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrefferedSalonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
