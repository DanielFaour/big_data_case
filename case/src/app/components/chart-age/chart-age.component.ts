import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartData } from 'chart.js';
import { CsvParser } from '../../services/cvs-parser.service';
import { SharedDataService } from '../../services/sharedData.service';

@Component({
  selector: 'app-chart-age',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './chart-age.component.html',
  styleUrls: ['./chart-age.component.scss', '../../app.component.scss'],
})
export class ChartAgeComponent {
  title = 'Age Group';
  fileUrl = './assets/dataset.csv';
  // public tableData: any[] = [];
  public chartType: ChartType = 'pie';
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

  // load chart, go through ages with a wall of ifs
  async loadChart(tableData: any[]) {
    const ageGroups = new Map<string, number[]>();
    // this.tableData = await this.csvParser.readCsvFromUrl(this.fileUrl);

    tableData.forEach((row: any) => {
      const age = parseInt(row.age);
      if (isNaN(age)) return;

      let key = '';
      if (age <= 20) key = '18-20';
      else if (age <= 30) key = '21-30';
      else if (age <= 40) key = '31-40';
      else if (age <= 50) key = '41-50';
      else if (age <= 60) key = '51-60';
      else key = '60+';

      if (!ageGroups.has(key)) {
        ageGroups.set(key, []);
      }

      ageGroups.get(key)!.push(age);
    });

    const sortedAgeGroups = Array.from(ageGroups.keys()).sort((a, b) =>
      a.localeCompare(b)
    );

    // console.log(sortedAgeGroups);

    const labels = sortedAgeGroups;
    const data = Array.from(ageGroups.values()).map((group) => group.length);

    // this.tableData.forEach((row: any) => {
    //   const age = String(row.age);
    //   if (age) {
    //     ageMap.set(age, (ageMap.get(age) ?? 0) + 1);
    //   }
    // });

    // const sortedAges = Array.from(ageMap.keys()).sort((a, b) =>
    //   a.localeCompare(b)
    // );

    // const labels = sortedAges.map((age) => age.toString());
    // const data = sortedAges.map((age) => ageMap.get(age) ?? 0);
    // initializing chart
    this.chartData = {
      labels,
      datasets: [
        {
          data,
          label: 'People per age group',
          borderColor: '#000000',
          borderWidth: 1,
        },
      ],
    };
  }



  chartData: ChartData<ChartType> = {
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
  };

  changeType() {
    if (this.chartType === 'pie') {
      this.chartType = 'doughnut';
    } else if (this.chartType === 'polarArea') {
      this.chartType = 'pie';
    } else {
      this.chartType = 'polarArea';
    }
  }
}