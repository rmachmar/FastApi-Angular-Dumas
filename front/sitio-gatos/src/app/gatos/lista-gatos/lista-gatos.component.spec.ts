import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGatosComponent } from './lista-gatos.component';

describe('ListaGatosComponent', () => {
  let component: ListaGatosComponent;
  let fixture: ComponentFixture<ListaGatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
