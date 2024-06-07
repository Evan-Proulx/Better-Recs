import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecBtnsComponent } from './rec-btns.component';

describe('RecBtnsComponent', () => {
  let component: RecBtnsComponent;
  let fixture: ComponentFixture<RecBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecBtnsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
