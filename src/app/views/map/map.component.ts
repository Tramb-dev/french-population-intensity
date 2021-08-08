import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  geojson: any;
  myMap: any;

  constructor(private http: HttpClient, private mapService: MapService) { }

  ngOnInit(): void {
    // Initialisation de la carte
    this.myMap = L.map('mapId').setView([48.853, 2.35], 6);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      }).addTo(this.myMap);

    // Chargement du fichier Geojson pour l'intégration des départements
    this.http.get('assets/data/departements.geojson').subscribe((departements: any) => {
      // Chargement de la densité de population
      this.http.get('assets/data/population-dep.json').subscribe((populations: any) => {
      //this.http.get('/population').subscribe((populations: any) => {
        for (const departement of departements.features) {
          for (const population of populations) {
            if (departement.properties.code === population.code) {
              departement.properties.density = population.population;
            }
          }
        }
        this.geojson = L.geoJSON(departements, { 
          style: (feature: any) => {
            return {
              fillColor: this.mapService.getColor(feature.properties.density),
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.7
            }
          },
          onEachFeature: (feature: any, layer: any) => {
            layer.on('mouseover', this.mapService.highlightFeature);
            layer.on('mouseout', (event: any) => {
              this.mapService.resetHighlight(event, this.geojson);
            });
            layer.on('click', (event: any) => {
              this.mapService.zoomToFeature(event, this.myMap);
            });
          },
        }).addTo(this.myMap);
      });
    });
  }
}
