import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCuartosComponent } from './modificar-cuartos.component';

describe('ModificarCuartosComponent', () => {
  let component: ModificarCuartosComponent;
  let fixture: ComponentFixture<ModificarCuartosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarCuartosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
