import { Component, OnInit } from '@angular/core';
import { CoordInfo } from '../models/coord-info.models';
import { Marker } from '../models/marker.model';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
 latitude : number;
 longitude: number;
  map = null;
  marker: Marker = {
    position: {
      lat: -0.1877174,
      lng: -78.5109762,
    },
   
  };
  coordIngo: CoordInfo = null;
  constructor(public geolocation: Geolocation) {}

  ngOnInit() {
    this.loadMap();
  }
  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const myLating = {
      lat: this.marker.position.lat,
      lng: this.marker.position.lng,
    };
    this.map = new google.maps.Map(mapEle, {
      center: myLating,
      zoom: 17,
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.addMarker(this.marker);
      mapEle.classList.add('show-map');
    });
  }
  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
    });
  }
 
}
