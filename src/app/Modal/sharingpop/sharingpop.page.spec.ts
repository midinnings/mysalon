import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SharingpopPage } from './sharingpop.page';

describe('SharingpopPage', () => {
  let component: SharingpopPage;
  let fixture: ComponentFixture<SharingpopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingpopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SharingpopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
