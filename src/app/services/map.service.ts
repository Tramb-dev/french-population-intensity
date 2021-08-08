import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  highlightFeature(event: any, L: any): void {
    const layerCible = event.target;

    layerCible.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layerCible.bringToFront();
    }
  }

  resetHighlight(event: any, geojson: any): void {
    geojson.resetStyle(event.target);
  }

  zoomToFeature(event: any, myMap: any) {
    myMap.fitBounds(event.target.getBounds());
  }

  /**
   * Colorie les départements en fonction de leur densité
   * @param density densité de la population
   * @returns une couleur en fonction de la densité
   */
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
