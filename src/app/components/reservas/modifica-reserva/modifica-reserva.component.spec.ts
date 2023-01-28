import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaReservaComponent } from './modifica-reserva.component';

describe('ModificaReservaComponent', () => {
  let component: ModificaReservaComponent;
  let fixture: ComponentFixture<ModificaReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaReservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
