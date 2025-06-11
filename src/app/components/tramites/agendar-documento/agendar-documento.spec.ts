import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarDocumento } from './agendar-documento';

describe('AgendarDocumento', () => {
  let component: AgendarDocumento;
  let fixture: ComponentFixture<AgendarDocumento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendarDocumento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarDocumento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
