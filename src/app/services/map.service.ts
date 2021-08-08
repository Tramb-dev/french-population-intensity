/**
 * Fourni les outils nécessaires pour la cartographie
 */

import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  colors: [string, number][] = [
    ['#800026', 2000000], 
    ['#BD0026', 1500000], 
    ['#E31A1C', 1000000], 
    ['#FC4E2A', 750000], 
    ['#FD8D3C', 500000], 
    ['#FEB24C', 250000], 
    ['#FED976', 100000], 
    ['#FFEDA0', 0]
  ];
  myMap: any;

  constructor() { }

  /**
   * Met en avant le département survolé
   * @param event événement mouseover
   */
  public highlightFeature(event: any): void {
    const layerCible = event.target;

    layerCible.setStyle({
      weight: 3,
      color: '#aaa',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layerCible.bringToFront();
    }
  }

  /**
   * Remet le département dans l'état initial lorsque la souris ne le survol plus
   * @param event événement mouseout
   * @param geojson les données contenues dans le fichier geojson
   */
  public resetHighlight(event: any, geojson: any): void {
    geojson.resetStyle(event.target);
  }

  /**
   * Lorsque l'utilisateur clic sur un département, la carte zoom dessus
   * @param event événement click
   * @param myMap référence à la carte
   */
  public zoomToFeature(event: any, myMap: any): void {
    myMap.fitBounds(event.target.getBounds());
  }

  /**
   * Colorie les départements en fonction de leur densité
   * @param density densité de la population
   * @returns une couleur en fonction de la densité
   */
  public getColor(density: number): string {
    return  density > this.colors[0][1] ? this.colors[0][0] :
            density > this.colors[1][1]  ? this.colors[1][0] :
            density > this.colors[2][1]  ? this.colors[2][0] :
            density > this.colors[3][1]  ? this.colors[3][0] :
            density > this.colors[4][1]   ? this.colors[4][0] :
            density > this.colors[5][1]   ? this.colors[5][0] :
            density > this.colors[6][1]   ? this.colors[6][0] :
                      this.colors[7][0];
  }
}
