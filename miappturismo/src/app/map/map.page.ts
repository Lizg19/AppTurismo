import { Component, OnInit } from '@angular/core';
import { CoordInfo } from '../models/coord-info.models';
import { Marker } from '../models/marker.model';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute, Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  latitude: any;
  longitude: any;
  map = null;
  marker: Marker = {
    position: {
      lat: -0.1877174,
      lng: -78.5109762,
    },
  };
  coordIngo: CoordInfo = null;
  constructor(public geolocation: Geolocation,private router: Router,private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.latitude= Number(this.activatedRoute.snapshot.paramMap.get("latitude"))
    this.longitude= Number(this.activatedRoute.snapshot.paramMap.get("longitude"))
    this.marker.position.lat= Number(this.activatedRoute.snapshot.paramMap.get("latitude"))
    this.marker.position.lng = Number(this.activatedRoute.snapshot.paramMap.get("longitude"))
    this.loadMap();
  }
  
  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const myLating = {
      lat: this.latitude,
      lng: this.longitude,
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
