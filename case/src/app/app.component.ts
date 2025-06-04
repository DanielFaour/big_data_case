import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ChartAgeComponent } from './components/chart-age/chart-age.component';
import { ChartStateComponent } from './components/chart-state/chart-state.component';
import { ChartMapComponent } from "./components/chart-map/chart-map.component";


@Component({
  selector: 'app-root',
  imports: [CommonModule, DataTableComponent, ChartAgeComponent, ChartStateComponent, ChartMapComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Big Data Overview';
}
