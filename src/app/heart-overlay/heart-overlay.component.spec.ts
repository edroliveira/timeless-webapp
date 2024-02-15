import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartOverlayComponent } from './heart-overlay.component';

describe('HeartOverlayComponent', () => {
  let component: HeartOverlayComponent;
  let fixture: ComponentFixture<HeartOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeartOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeartOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
