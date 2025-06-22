import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosFinalizados } from './documentos-finalizados';

describe('DocumentosFinalizados', () => {
  let component: DocumentosFinalizados;
  let fixture: ComponentFixture<DocumentosFinalizados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosFinalizados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosFinalizados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
