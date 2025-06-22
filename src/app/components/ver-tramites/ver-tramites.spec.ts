import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTramites } from './ver-tramites';

describe('VerTramites', () => {
  let component: VerTramites;
  let fixture: ComponentFixture<VerTramites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTramites]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTramites);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
