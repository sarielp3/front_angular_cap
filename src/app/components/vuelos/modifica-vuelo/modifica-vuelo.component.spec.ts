import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaVueloComponent } from './modifica-vuelo.component';

describe('ModificaVueloComponent', () => {
  let component: ModificaVueloComponent;
  let fixture: ComponentFixture<ModificaVueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaVueloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
