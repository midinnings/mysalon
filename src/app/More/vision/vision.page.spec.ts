import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisionPage } from './vision.page';

describe('VisionPage', () => {
  let component: VisionPage;
  let fixture: ComponentFixture<VisionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
