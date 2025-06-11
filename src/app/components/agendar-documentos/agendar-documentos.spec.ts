import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarDocumentos } from './agendar-documentos';

describe('AgendarDocumentos', () => {
  let component: AgendarDocumentos;
  let fixture: ComponentFixture<AgendarDocumentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendarDocumentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarDocumentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
