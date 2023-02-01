import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCuartosComponent } from './alta-cuartos.component';

describe('RegistroCuartosComponent', () => {
  let component: RegistroCuartosComponent;
  let fixture: ComponentFixture<RegistroCuartosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroCuartosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroCuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
