import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignarDocumentosComponent } from './asignar-documentos';

describe('AsignarDocumentosComponent', () => {
  let component: AsignarDocumentosComponent;
  let fixture: ComponentFixture<AsignarDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarDocumentosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AsignarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
