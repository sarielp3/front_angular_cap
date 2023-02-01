import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHotelesComponent } from './get-hoteles.component';

describe('GetHotelesComponent', () => {
  let component: GetHotelesComponent;
  let fixture: ComponentFixture<GetHotelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetHotelesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetHotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
