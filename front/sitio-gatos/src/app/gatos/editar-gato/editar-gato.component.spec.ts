import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGatoComponent } from './editar-gato.component';

describe('EditarGatoComponent', () => {
  let component: EditarGatoComponent;
  let fixture: ComponentFixture<EditarGatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarGatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarGatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
