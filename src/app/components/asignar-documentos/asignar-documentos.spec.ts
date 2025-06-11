import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarDocumentos } from './asignar-documentos';

describe('AsignarDocumentos', () => {
  let component: AsignarDocumentos;
  let fixture: ComponentFixture<AsignarDocumentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarDocumentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarDocumentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
