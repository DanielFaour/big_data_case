import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../../services/sharedData.service';

@Component({
  selector: 'app-chart-map',
  templateUrl: './chart-map.component.html',
  styleUrls: ['./chart-map.component.scss'],
})
export class ChartMapComponent implements AfterViewInit, OnDestroy {
  title = 'Map Over Entries';
  // private markers: L.Layer[] = [];
  private map!: L.Map;
  private geoJsonGroup: L.LayerGroup = L.layerGroup();
  private subscription!: Subscription;

  abbreviation: string = '';

  constructor(private sharedDataService: SharedDataService) {}

  // initializing map
  ngAfterViewInit(): void {
    this.map = L.map('map').setView([39.8283, -98.5795], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.subscription = this.sharedDataService.filteredData$.subscribe(
      (data) => {
        this.geoJsonGroup.clearLayers();
        const stateCountMap = new Map<string, number>();

        // placing total entries of each state in map
        data.forEach((row: any) => {
          const state = String(row.state);
          if (state) {
            stateCountMap.set(state, (stateCountMap.get(state) ?? 0) + 1);
          }
        });

        // console.log('data for map:', data);

        if (data && data.length) {
          // going through json document and finding polygons for each state
          fetch('assets/statesPolygon.json')
            .then((res) => res.json())
            .then((stateData) => {
              // going through each state
              stateData.features.forEach((feature: any) => {
                // getting short name for current state
                const abbr = stateAbbreviations[feature.properties.NAME];

                // console.log(abbr, stateCountMap.get(abbr));
                // console.log(feature);

                const count = stateCountMap.get(abbr) ?? 0; // if nothing set 0

                // initializing the polygons data and inserting data
                const geoJsonLayer = L.geoJSON(feature, {
                  style: {
                    color: 'blue',
                    weight: 1,
                    fillColor: 'lightblue',
                    fillOpacity: 0.2,
                  },
                }).bindTooltip(`${abbr}: ${count} entries`, {
                  sticky: true,
                  direction: 'top',
                  className: 'state-tooltip',
                });

                this.geoJsonGroup.addLayer(geoJsonLayer);
              });

              this.geoJsonGroup.addTo(this.map);
            })
            .catch((err) => console.error('json file loaded failed', err));
        }
      }
    );

    // this.subscription = this.sharedDataService.filteredData$.subscribe(
    //   (data) => {
    //     console.log('Data for map:', data);
    //     if (data && data.length) {
    //       this.markers.forEach((marker) => this.map.removeLayer(marker));
    //       this.markers = [];

    //       data.forEach((key) => {
    //         const lat = parseFloat(key.latitude);
    //         const lng = parseFloat(key.longitude);

    //         if (!isNaN(lat) && !isNaN(lng)) {
    //           const marker = L.circleMarker([lat, lng], {
    //             radius: 6,
    //             color: 'red',
    //             fillColor: 'red',
    //             fillOpacity: 1,
    //           })
    //             .addTo(this.map)
    //             .bindPopup(
    //               `${key['name/first'] || ''} ${key['name/last'] || ''}, ${
    //                 key.state || ''
    //               }`
    //             );

    //           this.markers.push(marker);
    //         }
    //       });
    //     }
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.map?.remove();
  }
}

// making sure i am able to find right state when analysing data, due to the json is fullname and data is abbr
const stateAbbreviations: Record<string, string> = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
  'District of Columbia': 'DC',
};
