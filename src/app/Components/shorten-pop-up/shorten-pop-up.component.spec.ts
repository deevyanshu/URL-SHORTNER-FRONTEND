import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortenPopUpComponent } from './shorten-pop-up.component';

describe('ShortenPopUpComponent', () => {
  let component: ShortenPopUpComponent;
  let fixture: ComponentFixture<ShortenPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortenPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShortenPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
