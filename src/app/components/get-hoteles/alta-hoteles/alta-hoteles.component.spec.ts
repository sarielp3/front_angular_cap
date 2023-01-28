import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaHotelesComponent } from './alta-hoteles.component';

describe('AltaHotelesComponent', () => {
  let component: AltaHotelesComponent;
  let fixture: ComponentFixture<AltaHotelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaHotelesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaHotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
