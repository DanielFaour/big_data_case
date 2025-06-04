import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartData, scales } from 'chart.js';
import { CsvParser } from '../../services/cvs-parser.service';
import { SharedDataService } from '../../services/sharedData.service';

@Component({
  selector: 'app-chart-state',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './chart-state.component.html',
  styleUrls: ['./chart-state.component.scss', '../../app.component.scss'],
})
export class ChartStateComponent {
  title = 'State';
  fileUrl = './assets/dataset.csv';
  // public tableData: any[] = [];
  public chartType: ChartType = 'radar';
  // public dataKey: Number = ;

  constructor(private csvParser: CsvParser, private sharedDataService: SharedDataService) {
    // load data from table component through service
    this.sharedDataService.filteredData$.subscribe(data => {
      if (data && data.length) {
        this.loadChart(data);
      }
    });

    // this.loadChart();
  }

  async loadChart(tableData: any[]) {
    const stateCountMap = new Map<string, number>();
    // this.tableData = await this.csvParser.readCsvFromUrl(this.fileUrl);

    tableData.forEach((row: any) => {
      const state = String(row.state);
      if (state) {
        stateCountMap.set(state, (stateCountMap.get(state) ?? 0) + 1);
      }
    });

    const sortedStates = Array.from(stateCountMap.keys()).sort((a, b) =>
      a.localeCompare(b)
    );

    const labels = sortedStates.map((state) => state.toString());
    const data = sortedStates.map((state) => stateCountMap.get(state) ?? 0);

    this.chartData = {
      labels,
      datasets: [
        {
          data,
          label: 'People per state',
        },
      ],
    };
  }

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '',
      },
    ],
  };

  chartOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  changeType() {
    if (this.chartType === 'pie') {
      this.chartType = 'doughnut';
    }
    else if (this.chartType === 'radar') {
      this.chartType = 'pie';
    }

    else {
      this.chartType = 'radar';

    }

  }
}
