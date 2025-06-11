import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmarDocumentos } from './firmar-documentos';

describe('FirmarDocumentos', () => {
  let component: FirmarDocumentos;
  let fixture: ComponentFixture<FirmarDocumentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirmarDocumentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmarDocumentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
