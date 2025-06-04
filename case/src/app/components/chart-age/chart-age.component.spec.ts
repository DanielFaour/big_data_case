import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAgeComponent } from './chart-age.component';

describe('ChartAgeComponent', () => {
  let component: ChartAgeComponent;
  let fixture: ComponentFixture<ChartAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartAgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 4 //
  it('should load chart data with 6 age groups', () => {
    const data = [
      { age: 10 },
      { age: 20 },
      { age: 30 },
      { age: 35 },
      { age: 40 },
      { age: 50 },
      { age: 60 },
      { age: 70 },
      { age: 75 },
    ];

    component.loadChart(data);

    expect(component.chartData.datasets[0].data.length).toBe(6);
  });
});
