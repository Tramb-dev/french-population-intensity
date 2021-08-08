import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const myMap = L.map('mapId').setView([48.853, 2.35], 6);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      }).addTo(myMap);

    this.http.get('assets/data/departements.geojson').subscribe((departements: any) => {
      this.http.get('/population').subscribe((populations: any) => {
        for (const departement of departements.features) {
          for (const population of populations) {
            if (departement.properties.code === population.code) {
              departement.properties.density = population.population;
            }
          }
        }
        L.geoJSON(departements, { style: (feature: any) => {
          return {
            fillColor: this.getColor(feature.properties.density),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
          };
        } }).addTo(myMap);
      });
    });
  }

  getColor(density: number): string {
    return  density > 2000000 ? '#800026' :
            density > 1500000  ? '#BD0026' :
            density > 1000000  ? '#E31A1C' :
            density > 750000  ? '#FC4E2A' :
            density > 500000   ? '#FD8D3C' :
            density > 250000   ? '#FEB24C' :
            density > 100000   ? '#FED976' :
                      '#FFEDA0';
  }
}
