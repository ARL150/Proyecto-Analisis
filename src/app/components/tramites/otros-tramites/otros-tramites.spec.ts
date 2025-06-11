import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosTramites } from './otros-tramites';

describe('OtrosTramites', () => {
  let component: OtrosTramites;
  let fixture: ComponentFixture<OtrosTramites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtrosTramites]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtrosTramites);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
