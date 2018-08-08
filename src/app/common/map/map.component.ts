import { Component, OnInit, Input } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() location: string;

  isPositionError = false;
  lat: number;
  lng: number;

  protected map: any;


  constructor(private mapService: MapService) { }

  ngOnInit() {
  }



  mapReadyHandler(map) {
    this.map = map;
    if (this.map) {
      this.mapService.getGeocodeLocation(this.location).subscribe((result) => {
        this.lat = result.lat;
        this.lng = result.lng;
        this.map.setCenter({lat: this.lat, lng: this.lng});
      }, () => {
        this.isPositionError = true;
      });
    }

  }
}
