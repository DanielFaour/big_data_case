import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStateComponent } from './chart-state.component';

describe('ChartStateComponent', () => {
  let component: ChartStateComponent;
  let fixture: ComponentFixture<ChartStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
