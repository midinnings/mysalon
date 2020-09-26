import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerPage } from './salon-list.page';

describe('EmployerPage', () => {
  let component: EmployerPage;
  let fixture: ComponentFixture<EmployerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
