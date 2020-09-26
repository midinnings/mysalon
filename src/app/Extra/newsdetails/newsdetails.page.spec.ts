import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsdetailsPage } from './newsdetails.page';

describe('NewsdetailsPage', () => {
  let component: NewsdetailsPage;
  let fixture: ComponentFixture<NewsdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
