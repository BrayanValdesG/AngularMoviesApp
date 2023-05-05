import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastSlideShowComponent } from './cast-slide-show.component';

describe('CastSlideShowComponent', () => {
  let component: CastSlideShowComponent;
  let fixture: ComponentFixture<CastSlideShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastSlideShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastSlideShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
