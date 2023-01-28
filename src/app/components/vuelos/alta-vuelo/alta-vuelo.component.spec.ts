import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaVueloComponent } from './alta-vuelo.component';

describe('AltaVueloComponent', () => {
  let component: AltaVueloComponent;
  let fixture: ComponentFixture<AltaVueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaVueloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
