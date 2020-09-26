import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlogdetailPage } from './blogdetail.page';

describe('BlogdetailPage', () => {
  let component: BlogdetailPage;
  let fixture: ComponentFixture<BlogdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
