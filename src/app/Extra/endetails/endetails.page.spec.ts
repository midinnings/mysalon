import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EndetailsPage } from './endetails.page';

describe('EndetailsPage', () => {
  let component: EndetailsPage;
  let fixture: ComponentFixture<EndetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EndetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
