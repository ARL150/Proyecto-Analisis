import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarFirma } from './asignar-firma';

describe('AsignarFirma', () => {
  let component: AsignarFirma;
  let fixture: ComponentFixture<AsignarFirma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarFirma]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarFirma);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
