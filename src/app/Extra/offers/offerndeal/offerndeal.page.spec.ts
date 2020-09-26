import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfferndealPage } from './offerndeal.page';

describe('OfferndealPage', () => {
  let component: OfferndealPage;
  let fixture: ComponentFixture<OfferndealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferndealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfferndealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
