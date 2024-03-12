import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleContentComponent } from './example-content.component';

describe('ExampleContentComponent', () => {
  let component: ExampleContentComponent;
  let fixture: ComponentFixture<ExampleContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExampleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
