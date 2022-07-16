import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CoordInfo } from '../models/coord-info.models';
import { Marker } from '../models/marker.model';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
declare var google;
@Component({
  selector: 'app-viewplacespropietario',
  templateUrl: './viewplacespropietario.page.html',
  styleUrls: ['./viewplacespropietario.page.scss'],
})
export class ViewplacespropietarioPage implements OnInit {
  lugar = {
    latitude: -0.1877174,
    longitude: -78.5109762,
    place: 'Kevin',
    description: 'Chao',
    caracteristica: 'HOLA',
    image:
      'https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9tYW50aWMlMjBwbGFjZXxlbnwwfHwwfHw%3D&w=1000&q=80',
  };
  listaLugares = [];
  // MAPA
  map = null;
  marker: Marker = {
    position: {
      lat: -0.1877174,
      lng: -78.5109762,
    },
  };
  coordIngo: CoordInfo = null;
  constructor(
    public database: DatabaseService,
    public afauth: AngularFireAuth,
    private router: Router
  ) {}

  
  gotoMap(latitude, longitude) {
    console.log(latitude, longitude);
    this.router.navigate(['/map']);
  }
  ngOnInit() {
    this.afauth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        this.database
          .getPlaces(`user/${uid}/Lugares/`)
          .then((firebaseResponse) => {
            firebaseResponse.subscribe((listaLugaresRes) => {
              this.listaLugares = listaLugaresRes.map((places) => {
                let lugar = places.payload.doc.data();

                return lugar;
              });
              console.log(this.listaLugares);
            });
          });
      }
    });
  }

}
