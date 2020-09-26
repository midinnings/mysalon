import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapmakerPage } from './mapmaker.page';

describe('MapmakerPage', () => {
  let component: MapmakerPage;
  let fixture: ComponentFixture<MapmakerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapmakerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapmakerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
