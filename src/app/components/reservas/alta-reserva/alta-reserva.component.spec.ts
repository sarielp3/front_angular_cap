import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaReservaComponent } from './alta-reserva.component';

describe('AltaReservaComponent', () => {
  let component: AltaReservaComponent;
  let fixture: ComponentFixture<AltaReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaReservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
