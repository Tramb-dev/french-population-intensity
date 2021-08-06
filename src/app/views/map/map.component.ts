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
      L.geoJSON(departements).addTo(myMap);
    });

    this.http.get('/population').subscribe((population: any) => {
      console.log(population);
    });
  }

}
