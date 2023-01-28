import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarHotelesComponent } from './modificar-hoteles.component';

describe('ModificarHotelesComponent', () => {
  let component: ModificarHotelesComponent;
  let fixture: ComponentFixture<ModificarHotelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarHotelesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarHotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
